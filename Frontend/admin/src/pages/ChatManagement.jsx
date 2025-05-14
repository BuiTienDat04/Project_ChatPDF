import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import { useNavigate } from 'react-router-dom';

function ChatManagement() {
  const [users, setUsers] = useState([
    { id: 1, fullName: 'Nguyễn Văn A', email: 'nguyenvana@example.com', uploadedFiles: ['document1.pdf', 'image1.jpg'] },
    { id: 2, fullName: 'Trần Thị B', email: 'tranthingb@example.com', uploadedFiles: ['report.pdf'] },
    { id: 3, fullName: 'Lê Văn C', email: 'levanc@example.com', uploadedFiles: [] },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true });
        if (response.status === 200) {
          setLoggedInUser(response.data);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin user đăng nhập trong ChatManagement:', error.response?.status, error.response?.data);
        setLoggedInUser(null);
        if (error.response && error.response.status === 401) {
           console.warn('Phiên hết hạn khi lấy thông tin user trong ChatManagement. Chuyển hướng về trang đăng nhập.');
           navigate('/admin-login');
        }
      } finally {
          setLoadingPage(false);
      }
    };
    fetchLoggedInUser();
  }, [navigate]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log('Đã chọn người dùng:', user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  const handleLogout = async () => {
    try {
        await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
        setLoggedInUser(null);
        localStorage.removeItem('currentUser');

        navigate('/admin-login');
    } catch (error) {
        console.error('Lỗi khi đăng xuất từ ChatManagement:', error);
        alert('Đăng xuất thất bại.');
    }
  };

  if (loadingPage) {
      return <div className="flex min-h-screen w-full items-center justify-center">Đang tải trang quản lý chat...</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-white text-black font-sans">
      <Sidebar user={loggedInUser} onLogout={handleLogout} />

      <main className="flex-grow overflow-y-auto p-6 bg-transparent">
        <div className="bg-gray-300 p-8 rounded-lg shadow-md mb-5">
          {selectedUser ? (
            <div>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer transition hover:bg-gray-700 mb-5"
                onClick={handleBackToList}
              >
                ← Quay lại
              </button>
              <h2 className="text-2xl font-semibold mb-5 text-black border-b border-gray-400 pb-3">
                Lịch sử Chat của {selectedUser.fullName}
              </h2>
              <div className="bg-gray-200 p-3 mb-3 rounded-md text-black">Tin nhắn mẫu 1...</div>
              <div className="bg-gray-200 p-3 mb-3 rounded-md text-black">Tin nhắn mẫu 2...</div>
              <div className="bg-gray-200 p-3 mb-3 rounded-md text-black">Tin nhắn mẫu 3...</div>

              <div className="mt-5">
                <h2 className="text-xl font-semibold mb-4 text-black border-b border-gray-400 pb-2">
                  Các File đã Upload
                </h2>
                <div className="flex flex-wrap gap-4">
                  {selectedUser.uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative flex items-center w-[350px] p-3 bg-gray-100 rounded-lg mb-4 shadow-md"
                    >
                      <img
                        src="/pdf-preview.png"
                        alt="preview"
                        className="w-[40px] h-[50px] mr-3 object-cover"
                      />
                      <div className="flex-1 overflow-hidden">
                        <div className="font-bold truncate">{file}</div>
                        <div className="text-sm text-gray-600">2025-05-07 23:1{index + 3}</div>
                      </div>

                      <div
                        onMouseEnter={() => setMenuOpenIndex(index)}
                        onMouseLeave={() => setMenuOpenIndex(null)}
                        className={`relative cursor-pointer p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-300 ${menuOpenIndex === index ? 'bg-gray-300' : ''}`}
                      >
                        <span className="text-xl font-bold">⋮</span>

                        {menuOpenIndex === index && (
                          <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[120px] overflow-hidden">
                            {['Rename', 'Download', 'Delete'].map((action, idx) => (
                              <div
                                key={idx}
                                onClick={() => console.log(`${action} ${file}`)}
                                className="px-4 py-2.5 cursor-pointer text-gray-700 transition-colors duration-200 ease-in-out hover:bg-gray-200"
                              >
                                {action}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-black border-b border-gray-400 pb-4">
                Quản lý Chat Người dùng
              </h2>

              <table className="w-full mt-5 bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="bg-gray-400 text-black px-4 py-3 text-left border-b border-gray-300">ID</th>
                    <th className="bg-gray-400 text-black px-4 py-3 text-left border-b border-gray-300">Họ và tên</th>
                    <th className="bg-gray-400 text-black px-4 py-3 text-left border-b border-gray-300">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleUserClick(user)}
                    >
                      <td className="px-4 py-3 border-b border-gray-300 text-black">{user.id}</td>
                      <td className="px-4 py-3 border-b border-gray-300 text-black">{user.fullName}</td>
                      <td className="px-4 py-3 border-b border-gray-300 text-black">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ChatManagement;