import React from 'react';
import { FaGoogle, FaApple, FaMobileAlt, FaStar, FaUser, FaChrome, FaTimes } from 'react-icons/fa';

const LoginModal = ({ onClose, onShowRegister }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay mờ */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      />
      
      {/* Nội dung modal */}
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
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
              Đăng nhập
            </h1>
            <p className="text-gray-600">
              Đăng nhập để nhận <span className="font-bold bg-purple-100 px-2 py-1 rounded-md text-purple-700">30 Tin Dụng miễn phí</span> mỗi ngày
            </p>
          </div>

          {/* Thống kê */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: <FaChrome className="text-2xl text-purple-600" />, value: "2023", label: "Yêu thích Chrome" },
              { icon: <FaStar className="text-2xl text-yellow-500" />, value: "100K+", label: "Xếp hạng 5 sao" },
              { icon: <FaUser className="text-2xl text-green-500" />, value: "10M+", label: "Người dùng tích cực" }
            ].map((item, index) => (
              <div key={index} className="text-center p-3 bg-white rounded-xl border border-purple-100 shadow-sm">
                <div className="mx-auto mb-2">{item.icon}</div>
                <span className="block font-bold text-purple-900">{item.value}</span>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Các nút đăng nhập */}
          <div className="space-y-4">
            {[
              { 
                icon: <FaGoogle className="text-xl" />, 
                text: "Tiếp tục với Google", 
                className: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-200" 
              },
              { 
                icon: <FaApple className="text-xl" />, 
                text: "Tiếp tục với Apple", 
                className: "bg-white border-2 border-purple-100 hover:border-purple-200 text-gray-800 shadow-sm hover:shadow-md" 
              },
              { 
                icon: <FaMobileAlt className="text-xl" />, 
                text: "Tiếp tục với Điện thoại", 
                className: "bg-white border-2 border-purple-100 hover:border-purple-200 text-gray-800 shadow-sm hover:shadow-md" 
              }
            ].map((btn, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-center gap-3 font-semibold py-3.5 rounded-xl transition-all ${btn.className}`}
              >
                {btn.icon}
                {btn.text}
              </button>
            ))}
          </div>

          {/* Liên kết đăng ký - Đã sửa thành button */}
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{' '}
            <button
              onClick={() => {
                onClose();
                onShowRegister();
              }}
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors focus:outline-none"
            >
              Tạo một tài khoản
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;