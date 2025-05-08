// config/cors.js
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Cho phép frontend
  methods: ['GET', 'POST'], // Các phương thức được phép
  credentials: true, // Nếu cần hỗ trợ cookie/authorization
};

module.exports = cors(corsOptions);