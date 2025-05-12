const { analyzePDF } = require('../services/pdfService');

exports.analyzePDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    const result = await analyzePDF(req.file.buffer);

    return res.json(result);

  } catch (error) {
    console.error('Error in analyzePDF controller:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message 
    });
  }
};