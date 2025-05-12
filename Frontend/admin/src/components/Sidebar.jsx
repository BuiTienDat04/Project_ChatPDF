import React from 'react';
import { FaTachometerAlt, FaComments, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/api';
import './sidebar.css';

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate(); 
  const defaultUser = {
    name: 'Người dùng',
    email: 'email@example.com',
    avatarUrl: 'https://via.placeholder.com/40'
  };

    const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        if (onLogout) {
          onLogout();
        }
        navigate('/', { replace: true });
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed');
    }
  };

  const currentUser = user || defaultUser;

  return (
    <aside className="sidebar">
      <div className="user-profile">
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.name}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '10px',
            objectFit: 'cover',
          }}
        />
        <div className="user-info">
          <div className="username-display">{currentUser.name}</div>
          <div className="user-email" style={{ fontSize: '0.9em', color: '#ced4da' }}>
            {currentUser.email}
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/dashboard" className="nav-link">
              <FaTachometerAlt className="nav-icon" />
              Bảng điều khiển
            </a>
          </li>
          <li>
            <a href="/account-management" className="nav-link">
              <FaUserCog className="nav-icon" />
              Quản lý tài khoản
            </a>
          </li>
          <li>
            <a href="/chat-management" className="nav-link">
              <FaComments className="nav-icon" />
              Quản lý trò chuyện
            </a>
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
