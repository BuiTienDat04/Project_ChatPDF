import React, { useState } from 'react';
import Sidebar from '../components/sidebar';

const sampleUsers = [
  {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    avatarUrl: 'https://via.placeholder.com/40',
    phone: '+84 912345678',
    birthday: '1995-08-10',
    gender: 'Nam',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatarUrl: 'https://via.placeholder.com/40',
    phone: '+84 987654321',
    birthday: '1997-02-15',
    gender: 'Nữ',
    address: 'TP.HCM, Việt Nam',
  },
  // Thêm các mẫu khác nếu cần
];

const AccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Quản lý tài khoản</h1>

          {/* Thanh tìm kiếm hiện đại với icon */}
          <div className="relative"> {/* Container để định vị icon */}
            <input
              type="text"
              placeholder="Tìm kiếm..."
              // Điều chỉnh padding-left (pl-10) để tạo khoảng trống cho icon
              className="px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-64" // Thêm w-64 để cố định chiều rộng
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Icon kính lúp */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Sử dụng SVG icon - bạn có thể thay thế bằng icon từ thư viện nếu đã cài */}
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Hoặc dùng Heroicon nếu đã cài: <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" /> */}
            </div>
          </div>
          {/* Kết thúc Thanh tìm kiếm */}

        </div>

        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-800">
                <div><span className="font-medium">Họ tên:</span> {user.name}</div>
                <div><span className="font-medium">Email:</span> {user.email}</div>
                <div><span className="font-medium">Số điện thoại:</span> {user.phone}</div>
                <div><span className="font-medium">Ngày sinh:</span> {user.birthday}</div>
                <div><span className="font-medium">Giới tính:</span> {user.gender}</div>
                <div><span className="font-medium">Địa chỉ:</span> {user.address}</div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-gray-500">Không tìm thấy người dùng phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;