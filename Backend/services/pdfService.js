const pdfParse = require('pdf-parse');
const visionClient = require('../config/googleVision');
const { saveTempFile, deleteTempFile } = require('../utils/fileUtils');

// Đổi tên function
async function analyzePDF(pdfBuffer) {
  const tempFilePath = await saveTempFile(pdfBuffer);
  
  try {
    const pdfData = await pdfParse(pdfBuffer);
    let fullText = pdfData.text;

    if (fullText.trim().length < 100) {
      const visionText = await extractTextWithVision(tempFilePath);
      fullText += '\n--- [Vision Extracted Text] ---\n' + visionText;
    }

    return fullText;
  } finally {
    await deleteTempFile(tempFilePath);
  }
}

module.exports = { analyzePDF }; // ✅ Export đúng tên
