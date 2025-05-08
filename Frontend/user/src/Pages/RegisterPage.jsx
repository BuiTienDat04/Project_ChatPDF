import React from 'react';
import { FaGoogle, FaApple, FaTrophy } from 'react-icons/fa';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 px-4">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl text-center relative transition-all duration-300 hover:shadow-2xl">
        {/* Nút đóng được thiết kế lại */}
        <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Phần tiêu đề được nhấn mạnh */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Đăng ký
          </h1>
          <p className="text-gray-600 text-sm">
            Đăng ký để nhận{' '}
            <span className="font-bold bg-yellow-100 px-2 py-1 rounded-md text-purple-700">30 Tín Dụng miễn phí</span>{' '}
            mỗi ngày
          </p>
        </div>

        {/* Phần highlight thiết kế lại */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
            <FaTrophy className="text-3xl text-yellow-500 mx-auto mb-2" />
            <span className="block font-bold text-purple-900">2023</span>
            <span className="text-xs text-gray-500">Yêu thích Chrome</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">100K+</div>
            <div className="text-xs text-gray-500">Xếp hạng 5 sao</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">10M+</div>
            <div className="text-xs text-gray-500">Người dùng tích cực</div>
          </div>
        </div>

        {/* Các nút đăng nhập xã hội */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-200">
            <FaGoogle className="text-xl" />
            Tiếp tục với Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 bg-white text-gray-800 font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
            <FaApple className="text-xl" />
            Tiếp tục với Apple
          </button>
        </div>

        {/* Liên kết đăng nhập */}
        <p className="mt-8 text-sm text-gray-500">
          Đã có tài khoản?{' '}
          <a href="/login" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;