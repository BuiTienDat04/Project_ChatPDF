
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import LoginModal from '../Pages/LoginPage';
import RegisterModal from '../Pages/RegisterPage';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/api';

const Navigation = ({ user, onLogout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);

  // Check user login status on mount and sync with prop
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          method: 'GET',
          credentials: 'include', // Include cookies for session
        });
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    // If no user prop, fetch from API
    if (!user) {
      fetchUser();
    } else {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleLogout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();
    if (response.ok) {
      navigate('/', { replace: true });
    } else {
      console.error('Backend logout failed:', data.message || 'Unknown error');
      alert('Đăng xuất thất bại từ server: ' + (data.message || 'Lỗi không xác định.'));
    }
  } catch (error) {
    console.error('Lỗi đăng xuất:', error);
    alert('Đăng xuất thất bại do lỗi mạng.');
  } finally {
    if (onLogout) {
      onLogout();
    }
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowDropdown(false);
    window.location.reload();
  }
};


  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-10 py-4 bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100/50">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-3 group transition-all duration-400 ease-out hover:scale-105">
            <div className="relative overflow-hidden p-2 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 shadow-lg">
              <Brain size={32} className="text-white transition-transform duration-500 group-hover:rotate-[360deg]" />
            </div>
            <span className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-pink-400/90 to-purple-500/90 bg-clip-text text-transparent">
              Sider
            </span>
          </Link>

          <nav className="hidden md:flex space-x-10 text-base font-medium">
            <Link to="/chatbot" className="relative text-gray-800/90 hover:text-pink-500 transition-colors duration-400 ease-out group">
              Trò chuyện
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
            <Link to="/chatpdf" className="relative text-gray-800/90 hover:text-pink-500 transition-colors duration-400 ease-out group">
              Chat PDF
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
            <Link to="/wisebase" className="relative text-gray-800/90 hover:text-purple-600 transition-colors duration-400 ease-out group">
              Wisebase
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
            <Link to="/tools" className="relative text-gray-800/90 hover:text-pink-500 transition-colors duration-400 ease-out group">
              Công cụ
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
            <Link to="/extensions" className="relative text-gray-800/90 hover:text-pink-500 transition-colors duration-400 ease-out group">
              Sự mở rộng
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
            <Link to="/customers" className="relative text-gray-800/90 hover:text-pink-500 transition-colors duration-400 ease-out group">
              Khách hàng
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
            <Link to="/pricing" className="relative text-gray-800/90 hover:text-pink-500 transition-colors duration-400 ease-out group">
              Định giá
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-400 ease-out"></span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4 relative">
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium rounded-full shadow-md transition-all duration-400 ease-out hover:from-pink-500 hover:to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300/50"
            >
              Đăng nhập
            </button>
          ) : (
            <div
              className="relative flex items-center space-x-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <img
                  src={currentUser?.picture || 'https://via.placeholder.com/40'}
                  alt="User Avatar"
                  className="w-11 h-11 rounded-full cursor-pointer border-2 border-pink-200/70 hover:border-purple-400/70 transition-all duration-400 ease-out hover:scale-110"
                  onClick={() => setShowDropdown(prev => !prev)}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/40')} // Fallback if avatar fails to load
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Brain size={12} className="text-white" />
                </div>
              </div>
              <span className="text-gray-800/90 font-medium text-sm hidden md:inline">
                {currentUser?.fullName || 'Người dùng'}
              </span>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 backdrop-blur-sm border border-pink-100/50 shadow-xl rounded-lg z-20">
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-800/90 hover:bg-purple-50/70 hover:text-purple-600 transition-all duration-300 ease-out"
                    onClick={() => navigate('/profile')}
                  >
                    Hồ sơ
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-pink-500/90 hover:bg-pink-50/70 hover:text-purple-600 transition-all duration-300 ease-out"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

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
