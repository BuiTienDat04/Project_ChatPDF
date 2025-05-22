require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('./config/cors');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const User = require('./models/User'); // Đảm bảo bạn có User model

// Import routes
const pdfRoutes = require('./routes/pdfRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const getUserRoutes = require('./routes/getUser');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Connect MongoDB
connectDB().then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection failed:', err);
});

// Session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'mySecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // For localhost (set true in production with HTTPS)
    httpOnly: true,
    sameSite: 'lax'
  }
});

// Middleware
app.use(cors);
app.options('*', cors);
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Share session with WebSocket
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// WebSocket connection
io.on('connection', async (socket) => {
  const session = socket.request.session;
  const userId = session?.passport?.user;

  if (!userId) {
    console.log('⚠️ Unauthenticated socket connection');
    return socket.disconnect();
  }

  try {
    await User.findByIdAndUpdate(userId, { statusOnline: true });
    console.log(`✅ User ${userId} is online`);
  } catch (err) {
    console.error('Error updating statusOnline:', err);
  }

  socket.on('disconnect', async () => {
    try {
      await User.findByIdAndUpdate(userId, { statusOnline: false });
      console.log(`❌ User ${userId} is offline`);
    } catch (err) {
      console.error('Error updating statusOffline:', err);
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
