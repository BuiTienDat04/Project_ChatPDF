const cors = require('cors');

module.exports = cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});