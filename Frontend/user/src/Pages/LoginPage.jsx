import React from 'react';
import { FaGoogle, FaApple, FaMobileAlt, FaStar, FaUser, FaChrome } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Phần tiêu đề */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Đăng nhập
          </h1>
          <p className="text-gray-600">
            Đăng nhập để nhận <span className="font-bold bg-purple-100 px-2 py-1 rounded-md text-purple-700">30 Tin Dụng miễn phí</span> mỗi ngày
          </p>
        </div>

        {/* Phần thống kê */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
            <div className="mx-auto mb-2 text-purple-600">
              <FaChrome className="text-2xl" />
            </div>
            <span className="block font-bold text-purple-900">2023</span>
            <span className="text-xs text-gray-500">Yêu thích Chrome</span>
          </div>
          
          <div className="text-center p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
            <div className="mx-auto mb-2 text-yellow-500">
              <FaStar className="text-2xl" />
            </div>
            <span className="block font-bold text-purple-900">100K+</span>
            <span className="text-xs text-gray-500">Xếp hạng 5 sao</span>
          </div>
          
          <div className="text-center p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
            <div className="mx-auto mb-2 text-green-500">
              <FaUser className="text-2xl" />
            </div>
            <span className="block font-bold text-purple-900">10M+</span>
            <span className="text-xs text-gray-500">Người dùng tích cực</span>
          </div>
        </div>

        {/* Các nút đăng nhập */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-purple-200">
            <FaGoogle className="text-xl" />
            Tiếp tục với Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 border-2 border-purple-100 hover:border-purple-200 bg-white text-gray-800 font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md">
            <FaApple className="text-xl" />
            Tiếp tục với Apple
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 border-2 border-purple-100 hover:border-purple-200 bg-white text-gray-800 font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md">
            <FaMobileAlt className="text-xl" />
            Tiếp tục với Điện thoại
          </button>
        </div>

        {/* Liên kết đăng ký */}
        <p className="mt-6 text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <a href="/register" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200">
            Tạo một tài khoản
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;