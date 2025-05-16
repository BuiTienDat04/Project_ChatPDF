require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Thêm mongoose vì connectDB sử dụng
const cors = require('./config/cors');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

// Import các routes
const pdfRoutes = require('./routes/pdfRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const getUserRoutes = require('./routes/getUser');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const chatRoutes = require('./routes/chat');
const { handleChatMessage } = require('./services/chatServices');

const app = express();
const server = http.createServer(app); // Tạo http server cho socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Kết nối MongoDB
console.log('Connecting to database...');
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(cors);
app.options('*', cors); // Giữ lại để xử lý CORS preflight
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Đặt thành true nếu dùng HTTPS
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', pdfRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/api/users', getUserRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/Chat', chatRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinChatRoom', (fileId) => {
    socket.join(fileId);
    console.log(`User ${socket.id} joined chat room for file ${fileId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { fileId, sender, content } = data;
    await handleChatMessage(fileId, sender, content, io);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Khởi động server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});