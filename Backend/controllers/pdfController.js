// controllers/pdfController.js
const { analyzePDF } = require('../services/pdfService');

exports.analyzePDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Gọi hàm xử lý PDF (từ buffer)
    const result = await analyzePDF(req.file.buffer);

    return res.json({ 
      success: true,
      originalText: result.text || result  // fallback nếu chỉ trả về chuỗi
    });

  } catch (error) {
    console.error('Error in analyzePDF controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
