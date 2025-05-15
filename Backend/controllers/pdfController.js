const { analyzePDF, translatePDF } = require('../services/pdfService');
const { validatePDFBuffer } = require('../utils/pdfUtils');

exports.analyzePDF = async (req, res, next) => {
  console.log('Nhận yêu cầu tới /api/analyze');
  try {
    if (!req.file) {
      console.log('Không có tệp được tải lên');
      return res.status(400).json({
        success: false,
        error: 'Không có tệp được tải lên',
        code: 'NO_FILE',
      });
    }

    const validationError = validatePDFBuffer(req.file.buffer);
    if (validationError) {
      console.log('Lỗi xác thực:', validationError);
      return res.status(400).json({
        success: false,
        error: validationError,
        code: 'INVALID_PDF',
      });
    }

    const result = await analyzePDF(req.file.buffer, 5);
    console.log('Kết quả phân tích:', JSON.stringify(result, null, 2));

    return res.json({
      success: true,
      data: {
        content: result.content,
        images: result.images,
        metadata: result.metadata,
      },
      warnings: result.warnings,
    });
  } catch (error) {
    console.error('Lỗi controller analyzePDF:', error);
    const statusCode = error.code === 'PDF_PROCESSING_ERROR' ? 422 : 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message,
      code: error.code || 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

exports.translatePDF = async (req, res, next) => {
  console.log('Nhận yêu cầu tới /api/Translatepdf');
  try {
    if (!req.file) {
      console.log('Không có tệp được tải lên');
      return res.status(400).json({
        success: false,
        error: 'Không có tệp được tải lên',
        code: 'NO_FILE',
      });
    }

    const validationError = validatePDFBuffer(req.file.buffer);
    if (validationError) {
      console.log('Lỗi xác thực:', validationError);
      return res.status(400).json({
        success: false,
        error: validationError,
        code: 'INVALID_PDF',
      });
    }

    const targetLang = req.targetLang || 'en';
    const result = await translatePDF(req.file.buffer, targetLang);
    console.log('Kết quả dịch:', JSON.stringify(result, null, 2));

    if (!result.success) {
      return res.status(422).json({
        success: false,
        error: 'Không thể dịch PDF',
        code: 'TRANSLATION_ERROR',
        warnings: result.warnings,
      });
    }

    return res.json({
      success: true,
      data: {
        translatedContent: result.translatedContent,
        metadata: result.metadata,
      },
      warnings: result.warnings,
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
};