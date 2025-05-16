require('dotenv').config();
const { performance } = require('perf_hooks');
const pdfjs = require('pdfjs-dist');
const path = require('path');
const { extractImagesFromPDF, extractTextWithStructure } = require('../utils/pdfUtils');
const { translatePDF, languageMap } = require('../utils/translateUtils');

function validatePDFBuffer(buffer) {
  if (!buffer || buffer.length === 0) return 'Tệp PDF trống';
  if (!buffer.toString('utf8', 0, 5).startsWith('%PDF-')) return 'Tệp không phải định dạng PDF hợp lệ';
  return null;
}

function isHeading(text, fontSize, avgFontSize, index, totalItems) {
  text = text.trim();
  if (!text) return false;
  const isLargerFont = fontSize > avgFontSize * 1.2;
  const isFirstLine = index < 3;
  const isNumbered = /^\d+[.)]\s+/.test(text);
  const isUppercase = text === text.toUpperCase() && text.length < 100;
  const isShort = text.length < 150 && !/[.,;!?]$/.test(text);
  return isLargerFont || isFirstLine || isNumbered || (isUppercase && isShort);
}

async function hasImages(pdf) {
  for (let i = 1; i <= pdf.numPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const ops = await page.getOperatorList();
      const hasInline = ops.fnArray.includes(pdfjs.OPS.paintInlineImage) || ops.fnArray.includes(pdfjs.OPS.paintImageXObject) || ops.fnArray.includes(pdfjs.OPS.paintJpegXObject);
      const resources = page.commonObjs.resources || {};
      const xObjects = resources.XObject || {};
      const hasXObject = Object.values(xObjects).some(obj => obj.Subtype?.value === 'Image');
      if (hasInline || hasXObject) {
        console.log(`Tìm thấy ảnh trên trang ${i}`);
        return true;
      }
    } catch (err) {
      console.warn(`Lỗi kiểm tra ảnh trên trang ${i}: ${err.message}`);
    }
  }
  console.log('Không tìm thấy ảnh nhúng trong PDF');
  return false;
}

async function processPage(pdf, pageNum, structuredText) {
  let warnings = [];
  let pageSections = [];
  try {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    console.log(`Số mục nội dung văn bản trên trang ${pageNum}:`, textContent.items.length);
    const pageParagraphs = structuredText.paragraphs.filter((para, idx) => {
      const paraPage = Math.floor(idx / (structuredText.paragraphs.length / pdf.numPages)) + 1;
      return paraPage === pageNum;
    });
    if (textContent.items.length === 0 && pageParagraphs.length === 0) {
      warnings.push(`Không trích xuất được văn bản từ trang ${pageNum}`);
      pageSections.push({ type: 'text', content: 'Không trích xuất được văn bản', page: pageNum });
    } else {
      textContent.items.sort((a, b) => b.transform[5] - a.transform[5]);
      const fontSizes = textContent.items.map(item => item.height || 0).filter(size => size > 0);
      const avgFontSize = fontSizes.length ? fontSizes.reduce((sum, size) => sum + size, 0) / fontSizes.length : 12;
      let currentSection = { type: 'text', content: '', page: pageNum };
      let lastFontSize = 0;
      let lastY = null;
      let lineSpacing = 0;
      textContent.items.forEach((item, index) => {
        const text = item.str.trim();
        if (!text) return;
        const fontSize = item.height || 12;
        const currentY = item.transform[5];
        if (lastY !== null) {
          const spacing = Math.abs(lastY - currentY);
          if (spacing > 0) lineSpacing = Math.max(lineSpacing, spacing);
        }
        lastY = currentY;
        const isLargerFont = fontSize > Math.max(lastFontSize * 1.2, avgFontSize * 1.1);
        const hasLargeSpacing = lastY !== null && Math.abs(lastY - currentY) > lineSpacing * 1.5;
        const isNewSection = isLargerFont || hasLargeSpacing || index === 0;
        if (isNewSection && currentSection.content.trim()) {
          pageSections.push({ ...currentSection });
          currentSection = { type: 'text', content: '', page: pageNum };
        }
        if (isNewSection && isHeading(text, fontSize, avgFontSize, index, textContent.items.length)) {
          if (currentSection.content.trim()) pageSections.push({ ...currentSection });
          pageSections.push({ type: 'heading', content: text, page: pageNum });
          currentSection = { type: 'text', content: '', page: pageNum };
        } else if (/^\s*[-•⋅●◦⦿⚫⚪⭐➤➢➔➜]\s/.test(text)) {
          if (!currentSection.content || currentSection.type !== 'list') {
            if (currentSection.content.trim()) pageSections.push({ ...currentSection });
            currentSection = { type: 'list', items: [], content: '', page: pageNum };
          }
          currentSection.items = currentSection.items || [];
          currentSection.items.push(text.replace(/^\s*[-•⋅●◦⦿⚫⚪⭐➤➢➔➜]\s/, '').trim());
        } else if (/^\s*\d+(\.\d+)*[.)]\s/.test(text)) {
          if (currentSection.type !== 'numbered_list') {
            if (currentSection.content.trim() || (currentSection.items && currentSection.items.length)) {
              pageSections.push({ ...currentSection });
            }
            currentSection = { type: 'numbered_list', items: [], content: '', page: pageNum };
          }
          currentSection.items = currentSection.items || [];
          currentSection.items.push(text.replace(/^\s*\d+(\.\d+)*[.)]\s/, '').trim());
        } else {
          if (currentSection.type === 'list' || currentSection.type === 'numbered_list') {
            if (text.length < 50) {
              const lastItem = currentSection.items[currentSection.items.length - 1];
              if (lastItem) {
                currentSection.items[currentSection.items.length - 1] = lastItem + ' ' + text;
                return;
              }
            }
            pageSections.push({ ...currentSection });
            currentSection = { type: 'text', content: '', page: pageNum };
          }
          currentSection.content += text + (item.hasEOL ? '\n' : ' ');
        }
        lastFontSize = fontSize;
      });
      if (currentSection.content?.trim() || (currentSection.items && currentSection.items.length > 0)) {
        pageSections.push({ ...currentSection });
      }
      const mergedSections = [];
      let lastSection = null;
      for (const section of pageSections) {
        if (lastSection && lastSection.type === 'text' && section.type === 'text') {
          lastSection.content += '\n\n' + section.content;
        } else {
          if (lastSection) mergedSections.push(lastSection);
          lastSection = { ...section };
        }
      }
      if (lastSection) mergedSections.push(lastSection);
      pageSections = mergedSections;
      if (pageSections.length === 0 && pageParagraphs.length > 0) {
        pageSections = pageParagraphs.map((para, idx) => ({
          type: isHeading(para, 14, 12, idx, pageParagraphs.length) ? 'heading' : 'text',
          content: para,
          page: pageNum,
        }));
      }
    }
    return { pageSections, warnings };
  } catch (error) {
    console.error(`Lỗi xử lý trang ${pageNum}:`, error);
    warnings.push(`Lỗi xử lý trang ${pageNum}: ${error.message}`);
    return { pageSections: [{ type: 'error', content: `Lỗi: ${error.message}`, page: pageNum }], warnings };
  }
}

async function analyzePDF(pdfBuffer, maxImagesPerPage = 5) {
  const startTime = performance.now();
  let warnings = [];
  try {
    let structuredText;
    try {
      structuredText = await extractTextWithStructure(pdfBuffer);
      console.log(`Trích xuất ${structuredText.paragraphs.length} đoạn văn`);
    } catch (textErr) {
      warnings.push(`Vấn đề trích xuất văn bản: ${textErr.message}`);
      console.warn('Cảnh báo trích xuất văn bản:', textErr);
      structuredText = { text: '', paragraphs: [], pages: 0 };
    }
    const pdf = await pdfjs.getDocument({
      data: pdfBuffer,
      disableWorker: true,
      useSystemFonts: true,
      cMapUrl: path.join(__dirname, '../../node_modules/pdfjs-dist/cmaps/'),
      cMapPacked: true,
    }).promise;
    let content = { sections: [], pages: [], text: structuredText.text || '', paragraphs: structuredText.paragraphs || [] };
    let images = [];
    try {
      console.log('Bắt đầu trích xuất ảnh...');
      const extractedImages = await extractImagesFromPDF(pdfBuffer);
      console.log(`Trích xuất thành công ${extractedImages.length} ảnh`);
      const sourceCounts = extractedImages.reduce((acc, img) => {
        acc[img.source] = (acc[img.source] || 0) + 1;
        return acc;
      }, {});
      console.log('Nguồn ảnh:', sourceCounts);
      const filteredImages = extractedImages.filter(img => img.dimensions && (img.dimensions.width > 30 && img.dimensions.height > 30));
      if (filteredImages.length < extractedImages.length) {
        console.log(`Đã lọc bỏ ${extractedImages.length - filteredImages.length} ảnh nhỏ`);
      }
      images = filteredImages.map(img => ({
        data: img.data,
        width: img.dimensions?.width || 0,
        height: img.dimensions?.height || 0,
        x: 0,
        y: 0,
        page: img.pageNumber,
        source: img.source || 'unknown',
        sizeKB: img.sizeKB || 0,
      }));
      if (images.length > maxImagesPerPage * pdf.numPages) {
        images = images.slice(0, maxImagesPerPage * pdf.numPages);
        console.log(`Giới hạn ảnh còn ${images.length} (${maxImagesPerPage} mỗi trang)`);
      }
      console.log(`Số lượng ảnh cuối cùng: ${images.length}`);
    } catch (imgError) {
      warnings.push(`Không thể trích xuất ảnh: ${imgError.message}`);
      console.error('Lỗi trích xuất ảnh:', imgError);
    }
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const { pageSections } = await processPage(pdf, pageNum, structuredText);
        const pageImages = images.filter(img => img.page === pageNum);
        content.pages.push({ pageNumber: pageNum, sections: pageSections, images: pageImages });
        content.sections = content.sections.concat(pageSections);
      } catch (pageError) {
        console.error(`Lỗi xử lý trang ${pageNum}:`, pageError);
        warnings.push(`Lỗi trên trang ${pageNum}: ${pageError.message}`);
        content.pages.push({
          pageNumber: pageNum,
          sections: [{ type: 'error', content: `Lỗi: ${pageError.message}`, page: pageNum }],
          images: images.filter(img => img.page === pageNum),
        });
      }
    }
    if (content.sections.length === 0 && structuredText.paragraphs.length > 0) {
      console.log('Sử dụng văn bản có cấu trúc để tạo sections');
      content.sections = structuredText.paragraphs.map((para, index) => {
        const page = Math.floor(index / (structuredText.paragraphs.length / pdf.numPages)) + 1;
        return { type: isHeading(para, 14, 12, index, structuredText.paragraphs.length) ? 'heading' : 'text', content: para, page };
      });
      content.pages = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const pageSections = content.sections.filter(section => section.page === pageNum);
        const pageImages = images.filter(img => img.page === pageNum);
        content.pages.push({ pageNumber: pageNum, sections: pageSections, images: pageImages });
      }
    }
    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);
    return {
      success: true,
      content,
      images,
      metadata: {
        processingTime: `${processingTime}s`,
        pages: pdf.numPages,
        imageCount: images.length,
        containsText: content.text.length > 0,
        containsImages: images.length > 0,
      },
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    console.error('Lỗi xử lý PDF:', error);
    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);
    warnings.push(`Lỗi xử lý PDF: ${error.message}`);
    return {
      success: false,
      content: { text: '', sections: [], paragraphs: [], pages: [] },
      images: [],
      metadata: { processingTime, pages: 0, imageCount: 0, containsText: false, containsImages: false },
      warnings,
    };
  }
}

async function translatePDFController(req, res, next) {
  console.log('Nhận yêu cầu tới /api/Translatepdf');
  try {
    if (!req.file) {
      console.log('Không có tệp được tải lên');
      return res.status(400).json({ success: false, error: 'Không có tệp được tải lên', code: 'NO_FILE' });
    }
    const validationError = validatePDFBuffer(req.file.buffer);
    if (validationError) {
      console.log('Lỗi xác thực:', validationError);
      return res.status(400).json({ success: false, error: validationError, code: 'INVALID_PDF' });
    }
    let structuredText;
    try {
      structuredText = await extractTextWithStructure(req.file.buffer);
      console.log(`Trích xuất ${structuredText.paragraphs.length} đoạn văn`);
    } catch (textErr) {
      console.error('Lỗi trích xuất văn bản:', textErr);
      return res.status(422).json({ success: false, error: `Không thể trích xuất văn bản: ${textErr.message}`, code: 'TEXT_EXTRACTION_ERROR' });
    }
    let targetLangs = req.body.targetLangs || req.query.targetLangs || [req.body.language || 'en'];
    let langNames = req.body.langNames || req.query.langNames || [];
    if (typeof targetLangs === 'string') targetLangs = targetLangs.split(',').map(lang => lang.trim().toLowerCase());
    if (typeof langNames === 'string') langNames = langNames.split(',').map(name => name.trim());
    if (!Array.isArray(targetLangs) || targetLangs.length === 0) {
      console.log('Danh sách ngôn ngữ không hợp lệ');
      return res.status(400).json({ success: false, error: 'Danh sách ngôn ngữ không hợp lệ', code: 'INVALID_LANGUAGES' });
    }
    console.log('Ngôn ngữ yêu cầu:', targetLangs);
    console.log('Tên ngôn ngữ:', langNames);
    const results = await Promise.all(
      targetLangs.map(async (lang, index) => {
        const langName = langNames[index] || languageMap[lang] || lang;
        try {
          const result = await translatePDF(structuredText, lang, langName);
          return { language: lang, langName, ...result };
        } catch (error) {
          console.error(`Lỗi dịch sang ${lang}:`, error);
          return {
            language: lang,
            langName: langNames[index] || lang,
            success: false,
            translatedContent: { text: '', paragraphs: [] },
            metadata: { processingTime: '0s', pages: 0, containsText: false, translatedLanguage: lang },
            warnings: [`Lỗi dịch sang ${lang}: ${error.message}`],
          };
        }
      })
    );
    const allFailed = results.every((r) => !r.success);
    if (allFailed) {
      return res.status(422).json({
        success: false,
        error: 'Không thể dịch PDF cho bất kỳ ngôn ngữ nào',
        code: 'TRANSLATION_ERROR',
        details: results,
      });
    }
    return res.json({
      success: true,
      data: results.map((r) => ({
        language: r.language,
        langName: r.langName,
        translatedContent: r.translatedContent,
        metadata: r.metadata,
        warnings: r.warnings,
        success: r.success,
      })),
    });
  } catch (error) {
    console.error('Lỗi controller translatePDF:', error);
    const statusCode = error.code === 'PDF_PROCESSING_ERROR' ? 422 : 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message,
      code: error.code || 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

module.exports = { analyzePDF, translatePDFController };