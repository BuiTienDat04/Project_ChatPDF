
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPDFPage from './Pages/ChatPDFPage';
import Navigation from './components/Navigation';
import TranslatePDF from './Pages/TranslatePDF';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Footer from './components/Footer';
import PricingPage from './Pages/PricingPage';
import ChatBotPage from './Pages/ChatBotPage';
import HomePage from './Pages/HomePage';
import TestimonialsSection from './components/TestimonialsSection';
import OurVisionSection from './components/OurVisionSection';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
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
        console.error('Failed to parse user data from localStorage on mount:', error);
        handleGlobalLogout();
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleGlobalLogout = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setCurrentUser(null);
    console.log('Đã xóa thông tin đăng nhập khỏi localStorage và cập nhật state.');
  };

  return (
    <BrowserRouter>
      <Navigation user={currentUser} onLogout={handleGlobalLogout} />

      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/home" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/translatepdf" element={<TranslatePDF />} />
        <Route path="/ourvisionsection" element={<OurVisionSection />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/chatpdf" element={<ChatPDFPage />} />
        <Route path="/testimonialsSection" element={<TestimonialsSection />} />
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-gray-600">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
