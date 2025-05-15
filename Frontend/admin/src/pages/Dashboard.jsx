import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar'; // <-- Import Sidebar
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

function Dashboard() { // <-- Sử dụng function component
  // Sử dụng state để lưu thông tin user đăng nhập, bao gồm _id ban đầu
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || { _id: null, name: 'Người dùng Quản trị' }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <-- Khởi tạo useNavigate

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Gọi API để lấy thông tin user đang đăng nhập (cần backend có route /auth/user trả về req.user)
        const response = await axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true });
        console.log('User Info API response:', response.data); // Log rõ hơn

        // Cập nhật state user với dữ liệu đầy đủ từ API
        setCurrentUser(response.data);
        // Lưu user đầy đủ vào Local Storage (nếu cần, cẩn thận đồng bộ state và LS)
        localStorage.setItem('currentUser', JSON.stringify(response.data));

        // Phần lấy sessionId từ cookie JS không cần thiết nếu HttpOnly cookie được dùng
        // và withCredentials=true đã được thiết lập. Có thể bỏ qua các dòng này.
        // const sessionId = document.cookie.split('; ').find(row => row.startsWith('sessionId='));
        // if (sessionId) {
        //   localStorage.setItem('sessionId', sessionId.split('=')[1]);
        // }

        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin user đăng nhập API:', err.response?.status, err.response?.data);
        setError('Không thể lấy thông tin người dùng. Kiểm tra backend hoặc trạng thái đăng nhập.');
        setLoading(false);

        // Xử lý lỗi 401: Phiên hết hạn, cần đăng nhập lại
        if (err.response?.status === 401) {
          console.warn('Phiên hết hạn. Chuyển hướng về trang đăng nhập.');
          localStorage.removeItem('currentUser'); // Xóa thông tin user cũ
          localStorage.removeItem('sessionId'); // Xóa session ID cũ (nếu có lưu)
          navigate('/admin-login'); // Chuyển hướng về trang đăng nhập bằng navigate
        } else {
             // Xử lý các lỗi khác nếu cần
        }
      }
    };
    fetchUserInfo();
  }, [navigate]); // Thêm navigate vào dependency array để useEffect không báo warning

  // Hàm xử lý logout (đã có sẵn, sử dụng axios và navigate)
  const handleLogout = () => {
    // Sử dụng POST cho logout request nếu backend mong đợi POST
    axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionId'); // Xóa session ID cũ (nếu có lưu)
        navigate('/admin-login'); // Chuyển hướng về trang đăng nhập sau logout
      })
      .catch(err => {
          console.error('Lỗi khi đăng xuất:', err);
           // Thông báo lỗi cho người dùng nếu logout thất bại ở backend
          alert('Đăng xuất thất bại. Vui lòng thử lại.');
      });
  };

  // --- Các phần code khác của Dashboard (stats, getSvgPathHistorical, recentUploads, v.v.) ---
  // Giữ nguyên các hàm và dữ liệu này

  const stats = [
    {
      label: 'Người dùng',
      value: 1532,
      iconClass: 'fas fa-user-friends',
      iconColor: '#9370DB'
    },
    {
      label: 'Tài liệu đã tải lên',
      value: 3487,
      iconClass: 'fas fa-cloud-upload-alt',
      iconColor: '#4682B4'
    },
    {
      label: 'Đoạn chat hôm nay',
      value: 348,
      iconClass: 'fas fa-comment-dots',
      iconColor: '#20B2AA'
    },
    {
      label: 'Tài khoản Online',
      value: 1200,
      iconClass: 'fas fa-circle',
      iconColor: '#28A745'
    },
  ];

  const historicalOnlineUsers = [
    { label: '5M ago', value: 300 },
    { label: '3M ago', value: 550 },
    { label: '1M ago', value: 800 },
    { label: '1W ago', value: 1000 },
    { label: 'Hôm nay', value: 1200 },
  ];

  const maxScaledYValue = 1300;
  const paddingPercentage = 1;

  const getSvgPathHistorical = (dataPoints) => {
    if (dataPoints.length === 0) return "";
    const svgWidth = 100;
    const svgHeight = 100;
    const numPoints = dataPoints.length;
    const effectiveWidth = svgWidth * (1 - (paddingPercentage / 100) * ((numPoints - 1) / numPoints));
    const scaleX = (index) => {
      const basePosition = (index / (numPoints - 1)) * effectiveWidth;
      const paddingOffset = (svgWidth - effectiveWidth) / 2;
      return basePosition + paddingOffset;
    };
    const scaleY = (value) => svgHeight - (value / maxScaledYValue) * svgHeight;
    let path = `M ${scaleX(0)},${scaleY(dataPoints[0].value)}`;
    for (let i = 1; i < numPoints; i++) {
      path += ` L ${scaleX(i)},${scaleY(dataPoints[i].value)}`;
    }
    return path;
  };

  const recentUploads = [
    { user: { name: 'Nguyễn Văn A', avatarUrl: 'https://via.placeholder.com/30' }, file: 'Báo cáo Q3.xlsx', time: 'Vừa xong' },
    { user: { name: 'Trần Thị B', avatarUrl: 'https://via.placeholder.com/30' }, file: 'Slide thuyết trình.pptx', time: '10 phút trước' },
    { user: { name: 'Lê Văn C', avatarUrl: 'https://via.placeholder.com/30' }, file: 'Image_001.png', time: '30 phút trước' },
    { user: { name: 'Phạm Thị D', avatarUrl: 'https://via.placeholder.com/30' }, file: 'Video call recording.mp4', time: '1 giờ trước' },
  ];

  const getIconColor = (label) => {
    switch (label) {
      case 'Người dùng': return '#9370DB';
      case 'Tài liệu đã tải lên': return '#4682B4';
      case 'Đoạn chat hôm nay': return '#20B2AA';
      case 'Tài khoản Online': return '#28A745';
      default: return '#9370DB';
    }
  };

  const yTicks = [0, 300, 600, 900, 1200];
  const viewBoxWidth = 130;
  const viewBoxHeight = 110;
  const viewBoxXStart = -15;
  const viewBoxYStart = 0;

  const svgTextStyle = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 'normal',
  };
  // --- Hết các phần code khác ---


  if (loading) {
    return <div className="flex min-h-screen w-full items-center justify-center">Đang tải Dashboard...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen w-full items-center justify-center text-red-500">{error}</div>;
  }

  // Đảm bảo currentUser có giá trị trước khi render Sidebar nếu cần thiết
  // Tuy nhiên, Sidebar đã có logic xử lý user=null nên có thể truyền trực tiếp

  return (
    <div className="flex min-h-screen w-full bg-white text-black font-sans">
      {/* *** SỬA Ở ĐÂY: TRUYỀN state currentUser (object đầy đủ) VÀO PROP 'user' *** */}
      {/* Sidebar giờ đây sẽ nhận được user object đầy đủ có _id để fetch chi tiết */}
      <Sidebar user={currentUser} onLogout={handleLogout} /> {/* <-- Truyền toàn bộ user object */}
      <main className="flex-grow overflow-y-auto p-6 bg-transparent">
        <div className="bg-gray-300 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-8 text-black border-b border-gray-400 pb-1">
            Tổng quan hoạt động
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center bg-white p-4 rounded-lg shadow hover:shadow-md transition border border-gray-300"
                style={{ height: '120px' }}
              >
                <div className="icon-container mb-2" style={{ color: stat.iconColor }}>
                  <i className={`${stat.iconClass} text-3xl`}></i>
                </div>
                <div className="text-2xl font-bold mb-1 text-black">{stat.value}</div>
                <div className="text-sm text-gray-700 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-5">
            <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
              Biểu đồ Lượng Người Dùng Online
            </h3>
            <div className="relative bg-gray-100 rounded-md max-w-3xl mx-auto" style={{ padding: '1rem', height: '450px' }}>
              <svg className="w-full h-full" viewBox={`${viewBoxXStart} ${viewBoxYStart} ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="none">
                {yTicks.map(tickValue => {
                  const y = 100 - (tickValue / maxScaledYValue) * 100;
                  return (
                    <React.Fragment key={tickValue}>
                      <line x1="0" y1={y} x2="100" y2={y} stroke="#d1d5db" strokeWidth=".2" strokeDasharray="1,1" />
                      <text
                        x="-2"
                        y={y}
                        dy=".3em"
                        fontSize="3"
                        fill="#4b5563"
                        textAnchor="end"
                        style={svgTextStyle}
                      >
                        {tickValue}
                      </text>
                    </React.Fragment>
                  );
                })}
                {historicalOnlineUsers.map((point, index) => {
                  const scaleX = (index) => {
                    const numPoints = historicalOnlineUsers.length;
                    const effectiveWidth = 100 * (1 - (paddingPercentage / 100) * ((numPoints - 1) / numPoints));
                    const basePosition = (index / (numPoints - 1)) * effectiveWidth;
                    const paddingOffset = (100 - effectiveWidth) / 2;
                    return basePosition + paddingOffset;
                  };
                  const x = scaleX(index);
                  return (
                    <line key={index} x1={x} y1="0" x2={x} y2="100" stroke="#d1d5db" strokeWidth=".2" strokeDasharray="1,1" />
                  );
                })}
                <path d={getSvgPathHistorical(historicalOnlineUsers)} stroke="#3B82F6" strokeWidth="1.5" fill="none" />
                {historicalOnlineUsers.map((point, index) => {
                  const scaleX = (index) => {
                    const numPoints = historicalOnlineUsers.length;
                    const effectiveWidth = 100 * (1 - (paddingPercentage / 100) * ((numPoints - 1) / numPoints));
                    const basePosition = (index / (numPoints - 1)) * effectiveWidth;
                    const paddingOffset = (100 - effectiveWidth) / 2;
                    return basePosition + paddingOffset;
                  };
                  const x = scaleX(index);
                  const y = 105;
                  return (
                    <text
                      key={`label-${index}`}
                      x={x}
                      y={y}
                      fontSize="4"
                      fill="#4b5563"
                      textAnchor="middle"
                      style={svgTextStyle}
                    >
                      {point.label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-5">
            <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
              Người dùng Upload File Gần đây
            </h3>
            <div className="space-y-3">
              {recentUploads.map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-100 rounded-md shadow-sm">
                  <img
                    src={item.user.avatarUrl}
                    alt={item.user.name}
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.user.name}</div>
                    <div className="text-sm text-gray-600 truncate">{item.file}</div>
                  </div>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;