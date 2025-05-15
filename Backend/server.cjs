const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const pdfRoutes = require('./routes/pdfRoutes');
const cors = require('./config/cors');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const getUserRoutes = require('./routes/getUser');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

console.log('Connecting to database...');
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Sử dụng CORS từ file config
app.use(cors);
app.options('*', cors);

// Middleware quan trọng
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use(cors);
app.options('*', cors);

app.use('/api', pdfRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/api/users', getUserRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});