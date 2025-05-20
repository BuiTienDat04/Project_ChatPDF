import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import { API_BASE_URL } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AccountManagement = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Lỗi khi đọc currentUser từ localStorage:", e);
      return null;
    }
  });

  const [loadingPage, setLoadingPage] = useState(!loggedInUser || !loggedInUser._id);


  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setLoggedInUser(null);
      localStorage.removeItem('currentUser');
      navigate('/admin-login', { replace: true });
    } catch (logoutError) {
      console.error('Lỗi khi đăng xuất từ AccountManagement:', logoutError);
      alert('Đăng xuất thất bại.');
    }
  }, [navigate]); 


  const fetchPageData = useCallback(async () => {
    if (!loggedInUser || !loggedInUser._id) {
       setLoadingPage(true);
    }
    setError(null);

    let currentFetchedUser = loggedInUser;

    if (!currentFetchedUser || !currentFetchedUser._id) {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true });
        if (userResponse.status === 200) {
          currentFetchedUser = userResponse.data;
          setLoggedInUser(currentFetchedUser);
          localStorage.setItem('currentUser', JSON.stringify(currentFetchedUser));
        } else {
          currentFetchedUser = null;
          setLoggedInUser(null);
          localStorage.removeItem('currentUser');
          navigate('/admin-login', { replace: true });
          setLoadingPage(false);
          return;
        }
      } catch (userError) {
        console.error('Lỗi khi lấy thông tin user đăng nhập:', userError.response?.status, userError.response?.data);
        currentFetchedUser = null;
        setLoggedInUser(null);
        localStorage.removeItem('currentUser');
        if (userError.response?.status === 401) {
          console.warn('Phiên hết hạn. Chuyển hướng về trang đăng nhập.');
          navigate('/admin-login', { replace: true });
        } else {
          setError('Không thể tải thông tin người dùng.');
        }
        setLoadingPage(false);
        return;
      }
    }

    if (!currentFetchedUser || !currentFetchedUser._id) {
        setLoadingPage(false); 
        return; 
    }

    try {
      const usersResponse = await axios.get(`${API_BASE_URL}/api/users`, { withCredentials: true });
      setUsers(usersResponse.data);
    } catch (usersError) {
      console.error('Lỗi khi tải danh sách người dùng:', usersError.response?.status, usersError.response?.data);
      if (usersError.response?.status === 401) {
        console.warn('Phiên hết hạn khi tải danh sách người dùng. Chuyển hướng về trang đăng nhập.');
        localStorage.removeItem('currentUser');
        navigate('/admin-login', { replace: true });
      } else {
        setError('Không thể tải danh sách người dùng.');
      }
    } finally {
      setLoadingPage(false);
    }
  }, [loggedInUser, navigate]); 

  useEffect(() => {
    fetchPageData();

    const intervalId = setInterval(fetchPageData, 5000);

    return () => clearInterval(intervalId);
  }, [fetchPageData]);

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingPage) {
    return <div className="flex min-h-screen w-full items-center justify-center text-lg text-gray-700">Đang tải dữ liệu quản lý tài khoản...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen w-full items-center justify-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-white text-black font-sans">
      <Sidebar user={loggedInUser} onLogout={handleLogout} />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Quản lý tài khoản</h1>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <div
              key={user._id || index}
              className="flex items-center bg-gray-200 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={user.picture || 'https://via.placeholder.com/40'}
                alt={user.fullName}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-800">
                <div><span className="font-medium">Họ tên:</span> {user.fullName}</div>
                <div><span className="font-medium">Email:</span> {user.email}</div>
                <div><span className="font-medium">Ngày sinh:</span> {user.birthday || '-'}</div>
                <div><span className="font-medium">Vai trò:</span> {user.role || '-'}</div>
                <div>
                  <span className="font-medium">Trạng thái:</span>{' '}
                  {user.statusOnline ? (
                    <span className="text-green-600">Online</span>
                  ) : (
                    <span className="text-red-600">Offline</span>
                  )}
                </div>
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