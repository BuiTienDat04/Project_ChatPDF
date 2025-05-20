import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import { useNavigate } from 'react-router-dom';

function SubscriptionManagement() {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : { _id: null, name: 'Người dùng Quản trị', email: 'guest@example.com' };
    });

    const [isLoadingPage, setIsLoadingPage] = useState(!currentUser._id);
    const [pageError, setPageError] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!isLoadingPage && !currentUser._id) {
                setIsLoadingPage(true);
            }
            setPageError(null);

            try {
                let userToUse = currentUser;

                if (!userToUse._id) {
                    const userResponse = await axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true });
                    console.log('User Info API response for SubscriptionManagement:', userResponse.data);
                    setCurrentUser(userResponse.data);
                    localStorage.setItem('currentUser', JSON.stringify(userResponse.data));
                    userToUse = userResponse.data;
                }

                if (userToUse._id) {
                    const subscriptionsResponse = await axios.get(`${API_BASE_URL}/api/subscriptions/users-with-subscription-status`, { withCredentials: true });
                    console.log('API response for users-with-subscription-status:', subscriptionsResponse.data);
                    setSubscriptions(subscriptionsResponse.data);
                }

            } catch (err) {
                console.error('Lỗi khi tải dữ liệu đăng ký người dùng:', err.response?.status, err.response?.data);
                setPageError('Không thể tải danh sách đăng ký người dùng. Vui lòng thử lại.');
                if (err.response?.status === 401) {
                    console.warn('Phiên hết hạn. Chuyển hướng về trang đăng nhập.');
                    localStorage.removeItem('currentUser');
                    navigate('/admin-login', { replace: true });
                }
            } finally {
                setIsLoadingPage(false);
            }
        };

        if (isLoadingPage || (currentUser._id && subscriptions.length === 0) || pageError) {
            fetchAllData();
        }

    }, [currentUser._id, navigate, subscriptions.length, pageError]);

    const handleLogout = () => {
        axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
            .then(() => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('sessionId');
                navigate('/admin-login', { replace: true });
            })
            .catch(err => {
                console.error('Lỗi khi đăng xuất:', err);
                alert('Đăng xuất thất bại. Vui lòng thử lại.');
            });
    };

    if (isLoadingPage) {
        return <div className="flex min-h-screen w-full items-center justify-center">Đang tải Quản lý Đăng ký...</div>;
    }

    if (pageError) {
        return <div className="flex min-h-screen w-full items-center justify-center text-red-500">{pageError}</div>;
    }

    return (
        <div className="flex min-h-screen w-full bg-white text-black font-sans">
            <Sidebar user={currentUser} onLogout={handleLogout} />
            <main className="flex-grow overflow-y-auto p-6 bg-transparent">
                <div className="bg-gray-300 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-8 text-black border-b border-gray-400 pb-1">
                        Quản lý Đăng ký Người dùng
                    </h2>
                    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên người dùng
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái Đăng ký
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gói Đăng ký
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày bắt đầu
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày hết hạn
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {subscriptions.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-200 transition duration-150 ease-in-out"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                                            <img
                                                src={user.picture}
                                                alt={user.fullName}
                                                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                                            />
                                            {user.fullName}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.currentSubscription ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {user.currentSubscription ? 'Active' : 'No Active Subscription'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.currentSubscription ? user.currentSubscription.packageName : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.currentSubscription ? new Date(user.currentSubscription.startDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.currentSubscription ? new Date(user.currentSubscription.endDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {subscriptions.length === 0 && !isLoadingPage && (
                            <p className="text-center text-gray-600 py-4">Không có dữ liệu đăng ký nào.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SubscriptionManagement;