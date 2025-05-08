import React from 'react';
import { FaGoogle, FaApple, FaTrophy, FaTimes } from 'react-icons/fa';

const RegisterModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Nội dung modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Phần nội dung */}
        <div className="p-8">
          {/* Tiêu đề */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Đăng ký
            </h1>
            <p className="text-gray-600">
              Đăng ký để nhận <span className="font-bold bg-yellow-100 px-2 py-1 rounded-md text-purple-700">30 Tín Dụng miễn phí</span> mỗi ngày
            </p>
          </div>

          {/* Thống kê */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
              <FaTrophy className="text-2xl text-yellow-500 mx-auto mb-2" />
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

          {/* Các nút đăng ký */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-purple-200">
              <FaGoogle className="text-xl" />
              Tiếp tục với Google
            </button>
            
            <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 bg-white text-gray-800 font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md">
              <FaApple className="text-xl" />
              Tiếp tục với Apple
            </button>
          </div>

          {/* Liên kết đăng nhập */}
          <p className="mt-6 text-center text-gray-600">
            Đã có tài khoản?{' '}
            <a href="/login" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;