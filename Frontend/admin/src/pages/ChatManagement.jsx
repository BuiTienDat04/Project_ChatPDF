import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function ChatManagement() {
  const [users, setUsers] = useState([
    { id: 1, fullName: 'Nguyễn Văn A', email: 'nguyenvana@example.com' },
    { id: 2, fullName: 'Trần Thị B', email: 'tranthingb@example.com' },
    { id: 3, fullName: 'Lê Văn C', email: 'levanc@example.com' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log('Đã chọn người dùng:', user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  const currentUser = { name: 'Người dùng Quản trị' };
  const handleLogout = () => {
    console.log('Đang đăng xuất khỏi thành phần ChatManagement');
  };

  const chatManagementLayoutContainerStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  };

  const sidebarContainerStyle = {
  };

  const mainContentAreaStyle = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: 'transparent',
  };

   const contentBlockStyle = {
        backgroundColor: '#cccccc',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
   }

  const titleStyle = {
    fontSize: '1.8em',
    marginBottom: '20px',
    color: '#333333',
    borderBottom: '1px solid #cccccc',
    paddingBottom: '15px',
  };

  const tableStyle = {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
  };

  const thStyle = {
      backgroundColor: '#cccccc',
      color: '#333333',
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: '1px solid #dddddd',
  };

  const tdStyle = {
      padding: '12px 15px',
      borderBottom: '1px solid #dddddd',
      color: '#333333',
      cursor: 'pointer',
  };

  const trHoverStyle = {
      backgroundColor: '#f1f1f1',
  };

  const chatHistoryContainerStyle = {
  };

  const chatHistoryTitleStyle = {
      fontSize: '1.5em',
      marginBottom: '20px',
      color: '#333',
  };

  const backButtonStyle = {
      padding: '10px 15px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1em',
      transition: 'background-color 0.3s ease',
      marginBottom: '20px',
  };

  const backButtonHoverStyle = {
      backgroundColor: '#5a6268',
  };

  const chatMessageStyle = {
      backgroundColor: '#e9ecef',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      color: '#333',
  };


  return (
    <div style={chatManagementLayoutContainerStyle}>

      <Sidebar username={currentUser.name} onLogout={handleLogout} />

      <main style={mainContentAreaStyle}>
        <div style={contentBlockStyle}>
          {selectedUser ? (
            <div>
              <button
                style={backButtonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, backButtonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, backButtonStyle)}
                onClick={handleBackToList}
              >
                &larr; Quay lại
              </button>
              <h2 style={chatHistoryTitleStyle}>Lịch sử Chat của {selectedUser.fullName}</h2>

              <div style={chatMessageStyle}>Tin nhắn mẫu 1...</div>
              <div style={chatMessageStyle}>Tin nhắn mẫu 2...</div>
              <div style={chatMessageStyle}>Tin nhắn mẫu 3...</div>

            </div>
          ) : (
            <div>
              <h2 style={titleStyle}>Quản lý Chat Người dùng</h2>

              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Họ và tên</th>
                    <th style={thStyle}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr
                      key={user.id}
                      style={{ cursor: 'pointer' }}
                      onMouseOver={(e) => Object.assign(e.currentTarget.style, trHoverStyle)}
                      onMouseOut={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
                      onClick={() => handleUserClick(user)}
                    >
                      <td style={tdStyle}>{user.id}</td>
                      <td style={tdStyle}>{user.fullName}</td>
                      <td style={tdStyle}>{user.email}</td>
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
