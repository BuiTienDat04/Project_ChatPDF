function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    // Lỗi liên quan đến PDF → 400 Bad Request
    if (err.message.includes('PDF')) {
      return res.status(400).json({ error: err.message });
    }
  
    // Lỗi server → 500 Internal Error
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  module.exports = errorHandler;