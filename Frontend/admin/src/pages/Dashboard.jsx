import React from 'react';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const stats = [
    { label: 'Người dùng trực tuyến', value: 350, icon: '🟢' },
    { label: 'Tổng cuộc trò chuyện', value: '15k', icon: '💬' },
    { label: 'Đăng ký mới', value: 85, icon: '👋' },
    { label: 'Tổng tin nhắn', value: '500k', icon: '✉️' },
  ];

  const currentUser = { name: 'Người dùng Quản trị' };
  const handleLogout = () => {
    console.log('Đang đăng xuất khỏi thành phần Dashboard');
  };

  const dashboardLayoutContainerStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
    color: '#000000',
  };

  const mainContentAreaStyle = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: 'transparent',
  };

  const dashboardContentStyle = {
      backgroundColor: '#cccccc',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    fontSize: '1.8em',
    marginBottom: '30px',
    color: '#333333',
    borderBottom: '1px solid #cccccc',
    paddingBottom: '5px',
  };

  const statsWidgetsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px',
    marginBottom: '10px',
  };

  const widgetStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #dddddd',
    color: '#000000',
  };

   const widgetIconStyle = {
      fontSize: '2.5em',
      marginBottom: '5px',
      color: '#9370DB',
   };

   const widgetValueStyle = {
      fontSize: '2.2em',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000000',
   };

   const widgetLabelStyle = {
      fontSize: '1em',
      color: '#333333',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
   };


  return (
    <div style={dashboardLayoutContainerStyle}>

      <Sidebar username={currentUser.name} onLogout={handleLogout} />

      <main style={mainContentAreaStyle}>
        <div style={dashboardContentStyle}>
          <h2 style={titleStyle}>Tổng quan hoạt động</h2>

          <div style={statsWidgetsStyle}>
            {stats.map((stat, index) => (
              <div key={index} style={widgetStyle}>
                <div style={widgetIconStyle}>{stat.icon}</div>
                <div style={widgetValueStyle}>{stat.value}</div>
                <div style={widgetLabelStyle}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
