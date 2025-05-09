import React from "react";
import { 
  FaRobot, 
  FaFilePdf, 
  FaLanguage, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaGithub 
} from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 pt-12 pb-8 px-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        
        {/* Cột 1 - Logo và mô tả */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <SiOpenai className="text-3xl text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Sider AI
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Nền tảng AI tiên tiến với công nghệ xử lý ngôn ngữ tự nhiên và phân tích tài liệu thông minh
          </p>
        </div>

        {/* Cột 2 - Công cụ chính */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <FaRobot className="mr-2 text-purple-400" />
            Công cụ AI
          </h3>
          <ul className="space-y-2">
            {['Chatbot Thông minh', 'Phân tích PDF', 'Dịch đa ngôn ngữ', 'Tóm tắt văn bản', 'Tạo nội dung AI'].map((item) => (
              <li key={item} className="group">
                <a href="#" className="flex items-center hover:text-purple-300 transition-colors">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3 - Hỗ trợ */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <FaFilePdf className="mr-2 text-blue-400" />
            Tài nguyên
          </h3>
          <ul className="space-y-2">
            {['Hướng dẫn sử dụng', 'API Developer', 'Chính sách bảo mật', 'Điều khoản dịch vụ', 'Câu hỏi thường gặp'].map((item) => (
              <li key={item} className="group">
                <a href="#" className="flex items-center hover:text-blue-300 transition-colors">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4 - Liên hệ */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <FaLanguage className="mr-2 text-green-400" />
            Liên hệ
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-2 text-gray-400" />
              <div>
                <p className="font-medium">Trụ sở chính</p>
                <p className="text-sm">Dương Nội, Hà Đông</p>
                <p className="text-sm">Hà Nội, Việt Nam</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-gray-400" />
              <span className="hover:text-green-300 transition-colors">
                +84 866 638 629
              </span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-400" />
              <a href="mailto:nguyendhieu1210@gmail.com" className="hover:text-green-300 transition-colors">
                support@sider.ai
              </a>
            </div>
          </div>
        </div>

        {/* Cột 5 - Mạng xã hội */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-3">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebook />, color: 'hover:text-blue-400', link: 'https://facebook.com' },
              { icon: <FaTwitter />, color: 'hover:text-sky-400', link: 'https://twitter.com' },
              { icon: <FaLinkedin />, color: 'hover:text-blue-600', link: 'https://linkedin.com' },
              { icon: <FaGithub />, color: 'hover:text-gray-100', link: 'https://github.com' }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                className={`text-2xl text-gray-400 transition-colors ${social.color} hover:scale-110`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sider AI. Đã đăng ký bản quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;