import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPDFPage from "./Pages/ChatPDFPage";
import UpfilePDF from "./Pages/UpfilePDF";
import Navigation from "./components/Navigation";
import TranslatePDF from "./Pages/TranslatePDF";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Footer from "./components/Footer";
import PricingPage from "./Pages/PricingPage";
import ChatBotPage from "./Pages/ChatBotPage";
import HomePage from "./Pages/HomePage"
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Logic này chỉ chạy một lần khi App mount để tải user từ localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedId = localStorage.getItem('_id');

    if (storedUser && storedToken && storedUserId && storedIsAdmin !== null && storedId) {
      try {
        const userObject = JSON.parse(storedUser);
        const user = {
          ...userObject,
          _id: storedId,
          isAdmin: storedIsAdmin === 'true',
          token: storedToken,
          userId: storedUserId,
        };
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to parse user data from localStorage on mount:", error);
        // Nếu lỗi parse lúc mount, dọn dẹp localStorage
        handleGlobalLogout();
      }
    } else {
      // Nếu không tìm thấy đủ dữ liệu trong localStorage lúc mount, set user là null
      setCurrentUser(null);
    }
  }, []); // Chỉ chạy một lần khi mount

  const handleGlobalLogout = () => {
    // Hàm này được gọi khi người dùng click Đăng xuất hoặc khi có lỗi parse localStorage lúc mount
    localStorage.removeItem('_id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setCurrentUser(null); // Cập nhật state user ở App.js

    console.log('Đã xóa thông tin đăng nhập khỏi localStorage và cập nhật state.');
  };

  return (
    <BrowserRouter>
      <Navigation user={currentUser} onLogout={handleGlobalLogout} />

      <Routes>
        {/* Truyền cả currentUser và setCurrentUser cho ChatPDFPage */}
        <Route path="/" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/home" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/chatpdf" element={<ChatPDFPage />} />
        <Route path="upfilepdf" element={<UpfilePDF />} />
        <Route path="/translatepdf" element={<TranslatePDF />} />
        {/* Truyền setCurrentUser cho LoginPage để cập nhật state sau khi login truyền thống */}
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pricing" element={< PricingPage />} />
        <Route path="/chatbot" element={<ChatBotPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/testimonialsSection" element={<TestimonialsSection />} />


        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
