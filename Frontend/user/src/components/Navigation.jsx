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
      <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6 md:px-8 py-4 bg-white shadow-md border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105">
            <div className="relative overflow-hidden p-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-md">
              <Brain size={32} className="text-white transition-transform duration-500 group-hover:rotate-[360deg]" />
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Sider
            </span>
          </Link>

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

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-5 py-2 bg-gray-900 text-white font-semibold rounded-full shadow-md
                transition-all duration-300 hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2
                focus:ring-gray-500 focus:ring-opacity-50"
            >
              Đăng nhập
            </button>
          ) : (
            <div className="relative">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-purple-500 transition"
                onClick={() => setShowDropdown(prev => !prev)}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-20">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.name}</div>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false); // Xử lý đăng xuất
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
