const { performance } = require('perf_hooks');
const pdfjs = require('pdfjs-dist');
const path = require('path');
const { extractImagesFromPDF, extractTextWithStructure } = require('../utils/pdfUtils');

console.log('Loading pdfService.js, cMapUrl:', path.join(__dirname, '../../node_modules/pdfjs-dist/cmaps/'));

/**
 * Kiểm tra xem một đoạn văn bản có phải là tiêu đề dựa vào đặc điểm
 * @param {string} text - Đoạn văn bản cần kiểm tra
 * @param {number} fontSize - Kích thước font
 * @param {number} avgFontSize - Kích thước font trung bình của trang
 
* @param {PDFDocumentProxy} pdf 
 * @returns {Promise<boolean>} 
 */
async function hasImages(pdf) {
  for (let i = 1; i <= pdf.numPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const ops = await page.getOperatorList();
      // Kiểm tra các toán tử liên quan đến hình ảnh
      const hasInline = ops.fnArray.includes(pdfjs.OPS.paintInlineImage) ||
                        ops.fnArray.includes(pdfjs.OPS.paintImageXObject) ||
                        ops.fnArray.includes(pdfjs.OPS.paintJpegXObject);
      // Kiểm tra tài nguyên XObject
      const resources = page.commonObjs.resources || {};
      const xObjects = resources.XObject || {};
      const hasXObject = Object.values(xObjects).some(obj => obj.Subtype?.value === 'Image');
      if (hasInline || hasXObject) {
        console.log(`Found images on page ${i}`);
        return true;
      }
    } catch (err) {
      console.warn(`Error checking images on page ${i}: ${err.message}`);
    }
  }
  console.log('No embedded images found in PDF');
  return false;
}
// Cải thiện hàm isHeading()
function isHeading(text, fontSize, avgFontSize, index, totalItems) {
  text = text.trim();
  if (!text) return false;

  // Tiêu đề thường có font size lớn hơn trung bình HOẶC là dòng đầu tiên của trang
  const isLargerFont = fontSize > avgFontSize * 1.2;
  const isFirstLine = index < 3;

  // Tiêu đề có thể bắt đầu bằng số hoặc chữ in hoa
  const isNumbered = /^\d+[.)]\s+/.test(text);
  const isUppercase = text === text.toUpperCase() && text.length < 100;

  // Tiêu đề thường ngắn và không chứa dấu câu cuối dòng
  const isShort = text.length < 150 && !/[.,;!?]$/.test(text);

  return isLargerFont || isFirstLine || isNumbered || (isUppercase && isShort);
}
/**
 * Phân tích PDF và trích xuất nội dung
 * @param {Buffer} pdfBuffer - Buffer của file PDF 
 * @param {number} maxImagesPerPage - Số lượng hình ảnh tối đa trích xuất mỗi trang
 */
async function analyzePDF(pdfBuffer, maxImagesPerPage = 5) {
  const startTime = performance.now();
  let warnings = [];

  try {
    // Trích xuất văn bản có cấu trúc
    let structuredText;
    try {
      structuredText = await extractTextWithStructure(pdfBuffer);
      console.log(`Extracted structured text: ${structuredText.paragraphs.length} paragraphs`);
    } catch (textErr) {
      warnings.push(`Text extraction issue: ${textErr.message}`);
      console.warn('Text extraction warning:', textErr);
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
      console.log('Starting image extraction...');
      const extractedImages = await extractImagesFromPDF(pdfBuffer);
      console.log(`Successfully extracted ${extractedImages.length} images`);

      const sourceCounts = extractedImages.reduce((acc, img) => {
        acc[img.source] = (acc[img.source] || 0) + 1;
        return acc;
      }, {});
      console.log('Image sources:', sourceCounts);

      const filteredImages = extractedImages.filter(img =>
        img.dimensions && (img.dimensions.width > 30 && img.dimensions.height > 30) // Giảm từ 50px -> 30px
      );

      if (filteredImages.length < extractedImages.length) {
        console.log(`Filtered out ${extractedImages.length - filteredImages.length} small images`);
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
        console.log(`Limited images to ${images.length} (${maxImagesPerPage} per page)`);
      }

      console.log(`Final images count: ${images.length}`);
    } catch (imgError) {
      warnings.push(`Failed to extract images: ${imgError.message}`);
      console.error('Image extraction error:', imgError);
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
        console.error(`Error processing page ${pageNum}:`, pageError);
        warnings.push(`Error on page ${pageNum}: ${pageError.message}`);

        content.pages.push({
          pageNumber: pageNum,
          sections: [{ type: 'error', content: `Error: ${pageError.message}`, page: pageNum }],
          images: images.filter(img => img.page === pageNum),
        });
      }
    }

    // Fallback nếu sections vẫn rỗng
    if (content.sections.length === 0 && structuredText.paragraphs.length > 0) {
      console.log('Using structured text to create sections');
      content.sections = structuredText.paragraphs.map((para, index) => {
        const page = Math.floor(index / (structuredText.paragraphs.length / pdf.numPages)) + 1;
        return {
          type: isHeading(para, 14, 12, index, structuredText.paragraphs.length) ? 'heading' : 'text',
          content: para,
          page: page,
        };
      });

      // Tạo lại pages từ sections
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
    console.error('PDF processing error:', error);
    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    warnings.push(`Error processing PDF: ${error.message}`);
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
 * Xử lý một trang PDF để trích xuất các phần cấu trúc
 * @param {PDFDocumentProxy} pdf - Tài liệu PDF
 * @param {number} pageNum - Số trang cần xử lý
 */
async function processPage(pdf, pageNum, structuredText) {
  let warnings = [];
  let pageSections = [];

  try {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    console.log(`Text content items on page ${pageNum}:`, textContent.items.length);

    // Lấy paragraphs từ structuredText cho trang hiện tại
    const pageParagraphs = structuredText.paragraphs.filter((para, idx) => {
      const paraPage = Math.floor(idx / (structuredText.paragraphs.length / pdf.numPages)) + 1;
      return paraPage === pageNum;
    });

    if (textContent.items.length === 0 && pageParagraphs.length === 0) {
      warnings.push(`No text content extracted from page ${pageNum}`);
      pageSections.push({ type: 'text', content: 'No text extracted', page: pageNum });
    } else {
      // Sắp xếp theo vị trí Y (từ trên xuống dưới)
      textContent.items.sort((a, b) => b.transform[5] - a.transform[5]);

      // Tính font size trung bình
      const fontSizes = textContent.items
        .map(item => item.height || 0)
        .filter(size => size > 0);
      const avgFontSize = fontSizes.length
        ? fontSizes.reduce((sum, size) => sum + size, 0) / fontSizes.length
        : 12;

      let currentSection = { type: 'text', content: '', page: pageNum };
      let lastFontSize = 0;
      let lastY = null;
      let lineSpacing = 0;

      textContent.items.forEach((item, index) => {
        const text = item.str.trim();
        if (!text) return;

        const fontSize = item.height || 12;
        const currentY = item.transform[5];

        // Phát hiện khoảng cách dòng
        if (lastY !== null) {
          const spacing = Math.abs(lastY - currentY);
          if (spacing > 0) lineSpacing = Math.max(lineSpacing, spacing);
        }
        lastY = currentY;

        // Xác định section mới
        const isLargerFont = fontSize > Math.max(lastFontSize * 1.2, avgFontSize * 1.1);
        const hasLargeSpacing = lastY !== null && Math.abs(lastY - currentY) > lineSpacing * 1.5;
        const isNewSection = isLargerFont || hasLargeSpacing || index === 0;

        if (isNewSection && currentSection.content.trim()) {
          pageSections.push({ ...currentSection });
          currentSection = { type: 'text', content: '', page: pageNum };
        }

        // Phân loại section
        if (isNewSection && isHeading(text, fontSize, avgFontSize, index, textContent.items.length)) {
          if (currentSection.content.trim()) pageSections.push({ ...currentSection });
          pageSections.push({ type: 'heading', content: text, page: pageNum });
          currentSection = { type: 'text', content: '', page: pageNum };
        } else if (/^\s*[-•⋅●◦⦿⚫⚪⭐➤➢➔➜]\s/.test(text)) {
          // Phát hiện danh sách bullet
          if (!currentSection.content || currentSection.type !== 'list') {
            if (currentSection.content.trim()) pageSections.push({ ...currentSection });
            currentSection = { type: 'list', items: [], content: '', page: pageNum };
          }
          currentSection.items = currentSection.items || [];
          currentSection.items.push(text.replace(/^\s*[-•⋅●◦⦿⚫⚪⭐➤➢➔➜]\s/, '').trim());
        } else if (/^\s*\d+(\.\d+)*[.)]\s/.test(text)) {
          // Phát hiện danh sách số
          if (currentSection.type !== 'numbered_list') {
            if (currentSection.content.trim() || (currentSection.items && currentSection.items.length)) {
              pageSections.push({ ...currentSection });
            }
            currentSection = { type: 'numbered_list', items: [], content: '', page: pageNum };
          }
          currentSection.items = currentSection.items || [];
          currentSection.items.push(text.replace(/^\s*\d+(\.\d+)*[.)]\s/, '').trim());
        } else {
          // Văn bản thông thường
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

      // Thêm section cuối cùng
      if (currentSection.content?.trim() || (currentSection.items && currentSection.items.length > 0)) {
        pageSections.push({ ...currentSection });
      }

      // Hợp nhất các đoạn text liên tiếp
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

      // Nếu pageSections rỗng, sử dụng pageParagraphs từ structuredText
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
    console.error(`Error processing page ${pageNum}:`, error);
    warnings.push(`Error processing page ${pageNum}: ${error.message}`);
    return {
      pageSections: [{ type: 'error', content: `Error: ${error.message}`, page: pageNum }],
      warnings,
    };
  }
}

module.exports = { analyzePDF };