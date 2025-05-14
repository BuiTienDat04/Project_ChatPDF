import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { API_BASE_URL } from '../api/api';

// Ghi nhớ BackgroundBubbles để tránh re-render khi trạng thái thay đổi
const BackgroundBubbles = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            willChange: 'transform',
            animation: `float ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient nền */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 opacity-95"></div>

      {/* Bubbles nền */}
      <BackgroundBubbles />

      {/* Form đăng nhập */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 backdrop-blur-sm z-10">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 mb-4 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Cổng thông tin Quản trị
          </h2>
          <p className="text-gray-600 mt-2">Đăng nhập bằng tài khoản Google để tiếp tục</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Đăng nhập bằng Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Cổng thông tin Quản trị. Bảo lưu mọi quyền.</p>
        </div>
      </div>

      {/* CSS cho animation mượt mà */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;