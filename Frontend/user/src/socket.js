// src/socket.js
import { io } from 'socket.io-client';
import { API_BASE_URL } from './api/api';

const socket = io(API_BASE_URL, {
  withCredentials: true,
  transports: ['websocket'], // dùng WebSocket, tránh polling
});

export default socket;
