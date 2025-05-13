const { extractImagesFromPDF } = require('./pdfUtils');
const { performance } = require('perf_hooks');

async function analyzePDF(pdfBuffer) {
  const startTime = performance.now();
  let warnings = [];
  
  try {
    // Phân tích song song
    const [textResult, images] = await Promise.allSettled([
      extractTextWithStructure(pdfBuffer),
      extractImagesFromPDF(pdfBuffer)
    ]);

    // Xử lý kết quả trích xuất văn bản
    let textData = { text: '', paragraphs: [] };
    if (textResult.status === 'fulfilled') {
      textData = textResult.value;
    } else {
      warnings.push('Failed to extract structured text: ' + textResult.reason.message);
      // Fallback: sử dụng phương pháp trích xuất đơn giản
      const simpleText = await extractSimpleText(pdfBuffer);
      textData = { text: simpleText, paragraphs: [simpleText] };
    }

    // Xử lý kết quả trích xuất ảnh
    let extractedImages = [];
    if (images.status === 'fulfilled') {
      extractedImages = images.value;
    } else {
      warnings.push('Failed to extract images: ' + images.reason.message);
    }

    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);
    
    return {
      success: true,
      text: textData,
      images: extractedImages,
      metadata: {
        processingTime: `${processingTime}s`,
        pages: textData.pages || 0,
        imageCount: extractedImages.length,
        containsText: textData.text.length > 0,
        containsImages: extractedImages.length > 0
      },
      warnings: warnings.length > 0 ? warnings : undefined
    };

  } catch (error) {
    console.error('PDF Processing Error:', error);
    error.code = 'PDF_PROCESSING_ERROR';
    throw error;
  }
}

async function extractSimpleText(pdfBuffer) {
  // Fallback đơn giản nếu không trích xuất được cấu trúc
  const pdfjs = await getDocument(pdfBuffer).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdfjs.numPages; i++) {
    const page = await pdfjs.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(item => item.str).join(' ') + '\n\n';
  }
  
  return fullText.trim();
}

module.exports = { analyzePDF };