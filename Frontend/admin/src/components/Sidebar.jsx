import React, { useEffect, useState } from 'react';
import { FaTachometerAlt, FaComments, FaSignOutAlt, FaUserCog, FaRegBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import './sidebar.css';

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const [currentUserDetails, setCurrentUserDetails] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (user) return user;
    if (storedUser) return JSON.parse(storedUser);

    return {
      _id: null,
      name: 'Người dùng',
      email: 'email@example.com',
      avatarUrl: 'https://via.placeholder.com/40'
    };
  });

  // Log state hien tai ngay truoc render
  console.log("Sidebar rendering. Current state currentUserDetails:", currentUserDetails);

  useEffect(() => {
    console.log("Sidebar useEffect triggered. User prop received:", user);

    if (user) {
      console.log("Sidebar useEffect: User prop is valid. Updating state with user:", user);
      setCurrentUserDetails(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      console.log("Sidebar useEffect: User prop is null/undefined. Resetting state.");
      setCurrentUserDetails({
        _id: null,
        name: 'Người dùng',
        email: 'email@example.com',
        avatarUrl: 'https://via.placeholder.com/40'
      });
      localStorage.removeItem('currentUser');
    }
  }, [user]); // Dependency array phụ thuộc vào prop 'user'

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      if (response.status === 200) {
        setCurrentUserDetails({
          _id: null,
          fullName: 'Người dùng',
          email: 'email@example.com',
          picture: 'https://via.placeholder.com/40'
        });
        localStorage.removeItem('currentUser');
        if (onLogout) {
          onLogout();
        }
        navigate('/', { replace: true });
      } else {
        throw new Error(response.data.message || 'Đăng xuất thất bại');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert(`Đăng xuất thất bại: ${error.message || 'Vui lòng thử lại.'}`);
    }
  };

  return (
    <aside className="sidebar">
      <div className="user-profile">
        <img
          src={currentUserDetails?.picture || 'https://via.placeholder.com/40'}
          alt={currentUserDetails?.fullName || 'Người dùng'}
          className="user-avatar"
        />
        <div className="user-info">
          <div className="username-display">{currentUserDetails?.fullName || 'Người dùng'}</div>
          <div className="user-email">{currentUserDetails?.email || 'email@example.com'}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className="nav-link">
              <FaTachometerAlt className="nav-icon" />
              Bảng điều khiển
            </Link>
          </li>
          <li>
            <Link to="/account-management" className="nav-link">
              <FaUserCog className="nav-icon" />
              Quản lý tài khoản
            </Link>
          </li>
          <li>
            <Link to="/chat-management" className="nav-link">
              <FaComments className="nav-icon" />
              Quản lý trò chuyện
            </Link>
          </li>
          <li>
            <Link to="/subscrible-management" className="nav-link">
              <FaRegBell className="nav-icon" /> 
              Quản lý đăng ký
            </Link>
          </li>

        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="button-icon" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;