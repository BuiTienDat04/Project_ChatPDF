import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar'; // <-- Import Sidebar
import { API_BASE_URL } from '../api/api';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

const AccountManagement = () => {
  // State để lưu danh sách tất cả user
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state cho danh sách user

  // *** THÊM STATE VÀ LOGIC ĐỂ LẤY USER ĐANG ĐĂNG NHẬP CHO SIDEBAR ***
  const [loggedInUser, setLoggedInUser] = useState(null); // State để lưu user đang đăng nhập
  const [loadingUser, setLoadingUser] = useState(true); // Loading state cho user đang đăng nhập
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Effect để lấy thông tin user đăng nhập khi component mount
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        // Cần có API ở backend để lấy user đang đăng nhập (ví dụ: /auth/user hoặc /auth/me)
        // API này cần được bảo vệ bằng ensureAuthenticated và trả về req.user
        const response = await axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true });
        if (response.status === 200) {
          setLoggedInUser(response.data); // Lưu user object vào state
        } else {
          // Xử lý nếu API không trả về user (vd: chưa đăng nhập)
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin user đăng nhập:', error);
        setLoggedInUser(null);
        // Xử lý lỗi: nếu lỗi là 401, chuyển hướng về trang login
        if (error.response && error.response.status === 401) {
           console.warn('Phiên hết hạn khi lấy thông tin user đăng nhập. Chuyển hướng về trang đăng nhập.');
           navigate('/admin-login');
        }
      } finally {
          setLoadingUser(false); // Đặt loading user = false sau khi fetch xong
      }
    };
    fetchLoggedInUser();
  }, [navigate]); // Thêm navigate vào dependency array

  // Effect gốc để Fetch users (danh sách tất cả user) từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Với withCredentials = true đã đặt cho axios, cookie sẽ được gửi kèm
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
         // Xử lý lỗi 401 cho danh sách user: chuyển hướng về login
        if (error.response && error.response.status === 401) {
             console.warn('Phiên hết hạn khi tải danh sách người dùng. Chuyển hướng về trang đăng nhập.');
             navigate('/admin-login');
        }
      } finally {
        // Đặt loading danh sách user = false sau khi fetch xong
        setLoading(false);
      }
    };

    // Gọi hàm fetch danh sách users
    fetchUsers();

  }, [navigate]); // Thêm navigate vào dependency array


  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hiển thị loading hoặc lỗi nếu cần (có thể kết hợp loadingUser và loading)
  // Ví dụ: chỉ hiển thị nội dung khi cả 2 đều không loading
  if (loadingUser || loading) {
      // Bạn có thể hiển thị loading spinner hoặc thông báo phù hợp
       return <div className="flex min-h-screen w-full items-center justify-center">Đang tải dữ liệu quản lý tài khoản...</div>;
  }

  // Có thể thêm kiểm tra nếu user đăng nhập là null sau khi loadingUser=false
  // if (!loggedInUser) {
  //     // Điều này sẽ được xử lý bởi navigate('/admin-login') trong useEffect 401
  //     // Nhưng nếu có trường hợp khác user=null mà không phải 401, có thể xử lý ở đây
  // }


  return (
    <div className="flex">
      {/* *** SỬA Ở ĐÂY: TRUYỀN state loggedInUser VÀO PROP 'user' *** */}
      {/* Sidebar giờ đây sẽ nhận được user object đầy đủ có _id để fetch chi tiết */}
      {/* Bạn cần xử lý hàm onLogout ở cấp độ này hoặc cao hơn nếu Sidebar có nút Logout */}
      {/* Đảm bảo loggedInUser có giá trị trước khi truyền nếu Sidebar không xử lý user=null tốt */}
      {/* Hoặc Sidebar đã được sửa để xử lý user=null/undefined */}
      <Sidebar user={loggedInUser} onLogout={() => { console.log("Logout initiated from AccountManagement"); /* Logic logout */ }} />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
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

        {/* Giữ nguyên phần hiển thị danh sách users, nó phụ thuộc vào state 'users' */}
        {/* {loading ? ( // Loading cho danh sách users đã được xử lý ở trên cùng
          // <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : ( */}
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
        {/* )} */} {/* Đóng ngoặc loading ban đầu */}
      </div>
    </div>
  );
};

export default AccountManagement;