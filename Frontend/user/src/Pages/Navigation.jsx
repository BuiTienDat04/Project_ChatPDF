import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, User } from 'lucide-react';

const Navigation = () => {
  return (
    // Added fixed, top-0, w-full, and z-10 classes for fixed positioning
    // Added px-6 md:px-8 py-4 for consistent padding
    // Added bg-white shadow-md border border-gray-200 rounded-lg for styling
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

        {/* Navigation Links with hover effect */}
        {/* Hidden on small screens, flex on medium and larger */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          {/* Navigation items */}
          <Link
            to="/chat"
            className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Trò chuyện
          </Link>
          <Link
            to="/pdf-chat" // Assuming this is the path for Chat PDF
            className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Chat PDF
          </Link>
          <Link
            to="/wisebase" // Assuming a path for Wisebase
            className="relative text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-purple-400 before:to-purple-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Wisebase
          </Link>
          <Link
            to="/tools" // Assuming a path for Tools
            className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Công cụ
          </Link>
          <Link
            to="/extensions" // Assuming a path for Extensions
            className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Sự mở rộng
          </Link>
          <Link
            to="/customers" // Assuming a path for Customers
            className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Khách hàng
          </Link>
          <Link
            to="/pricing"
            className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-105
             before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
             before:bg-gradient-to-r before:from-pink-400 before:to-pink-600 before:transition-all before:duration-300 hover:before:w-full"
          >
            Định giá
          </Link>
        </nav>
      </div>

      {/* Right Section - User Avatar */}
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center
             text-white font-semibold text-lg cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md">
            H {/* User initial */}
          </div>
          {/* Tooltip */}
          <span className="absolute -bottom-7 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-md
             border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Tài khoản
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
