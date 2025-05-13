const { analyzePDF } = require('../services/pdfService');
const { validatePDFBuffer } = require('../utils/pdfUtils');

exports.analyzePDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded',
        code: 'NO_FILE'
      });
    }

    // Validate PDF trước khi xử lý
    const validationError = validatePDFBuffer(req.file.buffer);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
        code: 'INVALID_PDF'
      });
    }

    const result = await analyzePDF(req.file.buffer);
    
    return res.json({
      success: true,
      data: {
        content: result.text,
        images: result.images,
        metadata: result.metadata
      },
      warnings: result.warnings
    });

  } catch (error) {
    console.error('PDF Analysis Error:', error);
    
    const statusCode = error.code === 'PDF_PROCESSING_ERROR' ? 422 : 500;
    return res.status(statusCode).json({ 
      success: false,
      error: error.message,
      code: error.code || 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};