import React from 'react';
import { FaTachometerAlt, FaComments, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = ({ user, onLogout }) => {
  const defaultUser = {
    name: 'Người dùng',
    email: 'email@example.com',
    avatarUrl: 'https://via.placeholder.com/40'
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
        <button onClick={onLogout} className="logout-button">
          <FaSignOutAlt className="button-icon" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
