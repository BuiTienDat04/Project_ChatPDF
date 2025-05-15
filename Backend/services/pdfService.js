require('dotenv').config();
const { performance } = require('perf_hooks');
const pdfjs = require('pdfjs-dist');
const path = require('path');
const { extractImagesFromPDF, extractTextWithStructure } = require('../utils/pdfUtils');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Khởi tạo Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Debug API key
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);

/**
 * Kiểm tra xem một đoạn văn bản có phải là tiêu đề
 * @param {string} text - Văn bản cần kiểm tra
 * @param {number} fontSize - Kích thước font
 * @param {number} avgFontSize - Kích thước font trung bình
 * @param {number} index - Vị trí đoạn văn
 * @param {number} totalItems - Tổng số đoạn văn
 * @returns {boolean}
 */
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

/**
 * Kiểm tra xem PDF có chứa ảnh
 * @param {PDFDocumentProxy} pdf
 * @returns {Promise<boolean>}
 */
async function hasImages(pdf) {
  for (let i = 1; i <= pdf.numPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const ops = await page.getOperatorList();
      const hasInline = ops.fnArray.includes(pdfjs.OPS.paintInlineImage) ||
                        ops.fnArray.includes(pdfjs.OPS.paintImageXObject) ||
                        ops.fnArray.includes(pdfjs.OPS.paintJpegXObject);
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

/**
 * Xử lý một trang PDF để trích xuất các phần cấu trúc
 * @param {PDFDocumentProxy} pdf - Tài liệu PDF
 * @param {number} pageNum - Số trang
 * @param {object} structuredText - Văn bản có cấu trúc
 * @returns {Promise<{pageSections: Array, warnings: Array}>}
 */
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
    return {
      pageSections: [{ type: 'error', content: `Lỗi: ${error.message}`, page: pageNum }],
      warnings,
    };
  }
}

/**
 * Phân tích PDF để trích xuất nội dung gốc
 * @param {Buffer} pdfBuffer - Buffer của file PDF
 * @param {number} maxImagesPerPage - Số lượng hình ảnh tối đa mỗi trang
 * @returns {Promise<object>} Kết quả phân tích
 */
async function analyzePDF(pdfBuffer, maxImagesPerPage = 5) {
  const startTime = performance.now();
  let warnings = [];

  try {
    // Trích xuất văn bản
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

    let content = {
      sections: [],
      pages: [],
      text: structuredText.text || '',
      paragraphs: structuredText.paragraphs || [],
    };

    let images = [];

    // Trích xuất ảnh
    try {
      console.log('Bắt đầu trích xuất ảnh...');
      const extractedImages = await extractImagesFromPDF(pdfBuffer);
      console.log(`Trích xuất thành công ${extractedImages.length} ảnh`);

      const sourceCounts = extractedImages.reduce((acc, img) => {
        acc[img.source] = (acc[img.source] || 0) + 1;
        return acc;
      }, {});
      console.log('Nguồn ảnh:', sourceCounts);

      const filteredImages = extractedImages.filter(img =>
        img.dimensions && (img.dimensions.width > 30 && img.dimensions.height > 30)
      );

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

    // Xử lý từng trang
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const { pageSections } = await processPage(pdf, pageNum, structuredText);
        const pageImages = images.filter(img => img.page === pageNum);

        content.pages.push({
          pageNumber: pageNum,
          sections: pageSections,
          images: pageImages,
        });

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

    // Fallback nếu sections rỗng
    if (content.sections.length === 0 && structuredText.paragraphs.length > 0) {
      console.log('Sử dụng văn bản có cấu trúc để tạo sections');
      content.sections = structuredText.paragraphs.map((para, index) => {
        const page = Math.floor(index / (structuredText.paragraphs.length / pdf.numPages)) + 1;
        return {
          type: isHeading(para, 14, 12, index, structuredText.paragraphs.length) ? 'heading' : 'text',
          content: para,
          page: page,
        };
      });

      content.pages = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const pageSections = content.sections.filter(section => section.page === pageNum);
        const pageImages = images.filter(img => img.page === pageNum);
        content.pages.push({
          pageNumber: pageNum,
          sections: pageSections,
          images: pageImages,
        });
      }
    }

    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    return {
      success: true,
      content: content,
      images: images,
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
      metadata: {
        processingTime: processingTime,
        pages: 0,
        imageCount: 0,
        containsText: false,
        containsImages: false,
      },
      warnings: warnings,
    };
  }
}

/**
 * Trích xuất và dịch văn bản từ PDF
 * @param {Buffer} pdfBuffer - Buffer của file PDF
 * @param {string} targetLang - Ngôn ngữ mục tiêu (ví dụ: 'en', 'vi')
 * @returns {Promise<object>} Văn bản đã dịch
 */
async function translatePDF(pdfBuffer, targetLang = 'en') {
  const startTime = performance.now();
  let warnings = [];

  try {
    // Trích xuất văn bản
    let structuredText;
    try {
      structuredText = await extractTextWithStructure(pdfBuffer);
      console.log(`Trích xuất ${structuredText.paragraphs.length} đoạn văn`);
    } catch (textErr) {
      warnings.push(`Vấn đề trích xuất văn bản: ${textErr.message}`);
      console.warn('Cảnh báo trích xuất văn bản:', textErr);
      throw new Error(`Không thể trích xuất văn bản: ${textErr.message}`);
    }

    // Dịch văn bản
    let translatedText = '';
    let translatedParagraphs = [];
    if (structuredText.text) {
      try {
        const prompt = `Dịch văn bản sau sang ${targetLang} một cách tự nhiên và chính xác:\n${structuredText.text}`;
        const result = await model.generateContent(prompt);
        translatedText = result.response.text();

        translatedParagraphs = await Promise.all(
          structuredText.paragraphs.map(async (para) => {
            if (!para) return '';
            const paraPrompt = `Dịch văn bản sau sang ${targetLang} một cách tự nhiên và chính xác:\n${para}`;
            const paraResult = await model.generateContent(paraPrompt);
            return paraResult.response.text();
          })
        );
        console.log(`Đã dịch ${translatedParagraphs.length} đoạn văn sang ${targetLang}`);
      } catch (translationErr) {
        warnings.push(`Lỗi dịch văn bản: ${translationErr.message}`);
        console.error('Lỗi dịch:', translationErr);
        throw new Error(`Không thể dịch văn bản: ${translationErr.message}`);
      }
    } else {
      warnings.push('Không có văn bản để dịch');
    }

    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    return {
      success: true,
      translatedContent: {
        text: translatedText,
        paragraphs: translatedParagraphs,
      },
      metadata: {
        processingTime: `${processingTime}s`,
        pages: structuredText.pages || 0,
        containsText: structuredText.text.length > 0,
        translatedLanguage: targetLang,
      },
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    console.error('Lỗi dịch PDF:', error);
    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    warnings.push(`Lỗi dịch PDF: ${error.message}`);
    return {
      success: false,
      translatedContent: { text: '', paragraphs: [] },
      metadata: {
        processingTime: processingTime,
        pages: 0,
        containsText: false,
        translatedLanguage: targetLang,
      },
      warnings: warnings,
    };
  }
}

module.exports = { analyzePDF, translatePDF };