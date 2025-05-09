import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, User } from 'lucide-react';
import LoginModal from '../Pages/LoginPage'; 
import RegisterModal from '../Pages/RegisterPage';

const Navigation = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6 md:px-8 py-4 bg-white shadow-md border-b border-gray-200">
        {/* Left Section - Logo and Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Logo with Brain icon and text */}
          <Link to="/" className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105">
            <div className="relative overflow-hidden p-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-md">
              <Brain
                size={32}
                className="text-white transition-transform duration-500 group-hover:rotate-[360deg]"
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Sider
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-base font-medium">
            <Link to="/chat" className="nav-link">Trò chuyện</Link>
            <Link to="/pdf-chat" className="nav-link">Chat PDF</Link>
            <Link to="/wisebase" className="nav-link text-purple-600 hover:text-purple-800">Wisebase</Link>
            <Link to="/tools" className="nav-link">Công cụ</Link>
            <Link to="/extensions" className="nav-link">Sự mở rộng</Link>
            <Link to="/customers" className="nav-link">Khách hàng</Link>
            <Link to="/pricing" className="nav-link">Định giá</Link>
          </nav>
        </div>

        {/* Right Section - Login Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-5 py-2 bg-gray-900 text-white font-semibold rounded-full shadow-md
                      transition-all duration-300 hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2
                      focus:ring-gray-500 focus:ring-opacity-50"
          >
            Đăng nhập
          </button>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onShowRegister={() => {
            setShowLoginModal(false);
            setShowRegister(true);
          }} 
        />
      )}
      
      {/* Register Modal */}
      {showRegister && (
        <RegisterModal 
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

// Thêm CSS cho nav-link (có thể đặt trong file CSS hoặc Tailwind @layer)
const navLinkClasses = `
  relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
  before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
  before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full
`;

export default Navigation;