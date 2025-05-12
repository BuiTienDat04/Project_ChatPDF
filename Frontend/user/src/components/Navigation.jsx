import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import LoginModal from '../Pages/LoginPage';
import RegisterModal from '../Pages/RegisterPage';

const Navigation = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Giả lập trạng thái đã đăng nhập
  const [showDropdown, setShowDropdown] = useState(false);

  // Giả lập thông tin người dùng (ảnh avatar)
  const user = {
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/40' // ảnh demo
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6 md:px-8 py-4 bg-gradient-to-r from-pink-50 to-purple-50 shadow-lg border-b border-pink-100">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105">
            <div className="relative overflow-hidden p-2 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 shadow-md">
              <Brain size={32} className="text-white transition-transform duration-500 group-hover:rotate-[360deg]" />
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Sider
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-base font-medium">
            <Link to="/chatbot" className="relative text-black hover:text-pink-500 transition-colors duration-300 group">
              Trò chuyện
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link to="/chatpdf" className="relative text-black hover:text-pink-500 transition-colors duration-300 group">
              Chat PDF
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link to="/wisebase" className="relative text-black hover:text-purple-600 transition-colors duration-300 group">
              Wisebase
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link to="/tools" className="relative text-black hover:text-pink-500 transition-colors duration-300 group">
              Công cụ
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link to="/extensions" className="relative text-black hover:text-pink-500 transition-colors duration-300 group">
              Sự mở rộng
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link to="/customers" className="relative text-black hover:text-pink-500 transition-colors duration-300 group">
              Khách hàng
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link to="/pricing" className="relative text-black hover:text-pink-500 transition-colors duration-300 group">
              Định giá
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-5 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full shadow-md
                transition-all duration-300 hover:from-pink-500 hover:to-purple-600 hover:scale-105 focus:outline-none focus:ring-2
                focus:ring-pink-300 focus:ring-opacity-50"
            >
              Đăng nhập
            </button>
          ) : (
            <div className="relative">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-pink-200 hover:border-purple-400 transition duration-300"
                onClick={() => setShowDropdown(prev => !prev)}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-pink-100 shadow-xl rounded-md z-20">
                  <div className="px-4 py-2 text-sm text-purple-600 border-b border-pink-100">{user.name}</div>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false); // Xử lý đăng xuất
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-pink-500 hover:bg-pink-50 hover:text-purple-600 transition"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onShowRegister={() => {
            setShowLoginModal(false);
            setShowRegister(true);
          }}
        />
      )}

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

export default Navigation;