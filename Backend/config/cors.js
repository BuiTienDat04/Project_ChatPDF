// config/cors.js
const cors = require('cors');

const corsOptions = {
 origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);