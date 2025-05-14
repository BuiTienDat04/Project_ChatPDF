const cors = require('cors');

module.exports = cors({
  origin: 'http://localhost:3000', // Cho phép frontend tại cổng 3000
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});