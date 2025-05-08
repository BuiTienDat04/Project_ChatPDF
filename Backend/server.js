// server.js
const express = require('express');
const pdfRoutes = require('./routes/pdfRoutes');
const cors = require('./config/cors'); // Import cấu hình CORS

const app = express();

// Middleware quan trọng
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng CORS từ file config
app.use(cors);

// Sử dụng routes
app.use('/api', pdfRoutes);

// Xử lý lỗi cuối cùng
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});