// app.js
require('dotenv').config();
const express = require('express');
const pdfRoutes = require('./routes/pdfRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json()); // Parse JSON body
app.use('/', pdfRoutes); // Đăng ký routes
app.use(errorHandler); // Xử lý lỗi tập trung

module.exports = app;