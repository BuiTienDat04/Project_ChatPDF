const pdfParse = require('pdf-parse');
const { extractImagesFromPDF } = require('../utils/pdfImageExtractor');

async function analyzePDF(pdfBuffer) {
  try {
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Empty PDF buffer received');
    }

    // Phân tích song song để tăng hiệu suất
    const [pdfData, images] = await Promise.all([
      pdfParse(pdfBuffer),
      extractImagesFromPDF(pdfBuffer).catch(() => []) // Nếu lỗi vẫn tiếp tục với images rỗng
    ]);

    return {
      success: true,
      text: pdfData.text,
      images: images || [],
      metadata: {
        ...pdfData.metadata,
        pageCount: pdfData.numpages
      }
    };
  } catch (error) {
    console.error('Error in PDF analysis:', error);
    throw error;
  }
}

// Export chính xác tên hàm
module.exports = { analyzePDF };