// server.js
require('dotenv').config();
const express = require('express');
const pdfRoutes = require('./routes/pdfRoutes');
const cors = require('./config/cors'); // Import cấu hình CORS
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();

// Kết nối MongoDB
connectDB();

// Middleware quan trọng
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng CORS từ file config
app.use(cors);
app.options('*', cors);

// Sử dụng routes
app.use('/api', pdfRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Xử lý lỗi cuối cùng
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});