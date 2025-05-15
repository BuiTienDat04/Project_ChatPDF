import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import { API_BASE_URL } from '../api/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const SubscriptionManagement = () => {
    const [allUsersWithStatus, setAllUsersWithStatus] = useState([]);
    const [loadingInitialList, setLoadingInitialList] = useState(true);
    const [errorInitialList, setErrorInitialList] = useState(null);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserSubscriptions, setSelectedUserSubscriptions] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [errorHistory, setErrorHistory] = useState(null);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
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
                console.error('Error fetching logged-in user:', error);
                setLoggedInUser(null);
                if (error.response && error.response.status === 401) {
                    navigate('/admin-login');
                }
                setErrorInitialList(error.message || "Could not load admin user information.");
            } finally {
                setLoadingUser(false);
            }
        };
        fetchLoggedInUser();
    }, [navigate]);

    useEffect(() => {
        const fetchAllUsersWithStatus = async () => {
            try {
                setLoadingInitialList(true);
                setErrorInitialList(null);

                const response = await axios.get(`${API_BASE_URL}/api/subscriptions/users-with-subscription-status`, { withCredentials: true });

                if (response.status === 200) {
                    setAllUsersWithStatus(response.data);
                } else {
                    setAllUsersWithStatus([]);
                    setErrorInitialList(`Error loading users list: Status ${response.status}`);
                }
            } catch (error) {
                console.error('Error loading users list:', error);
                setErrorInitialList(error.message || 'An error occurred while loading the user list.');
                if (error.response && error.response.status === 401) {
                    navigate('/admin-login');
                }
            } finally {
                setLoadingInitialList(false);
            }
        };

        fetchAllUsersWithStatus();

    }, [navigate, loggedInUser, loadingUser]);

    useEffect(() => {
        if (!selectedUser) {
            setSelectedUserSubscriptions([]);
            setErrorHistory(null);
            return;
        }

        const fetchSelectedUserHistory = async () => {
            try {
                setLoadingHistory(true);
                setErrorHistory(null);

                const response = await axios.get(`${API_BASE_URL}/api/subscriptions/${selectedUser._id}/subscriptions`, { withCredentials: true });

                if (response.status === 200) {
                    setSelectedUserSubscriptions(response.data);
                } else {
                    setSelectedUserSubscriptions([]);
                    setErrorHistory(`Error loading history: Status ${response.status}`);
                }
            } catch (error) {
                console.error('Error loading detailed subscription history:', error);
                setErrorHistory(error.message || 'An error occurred while loading the history.');
                if (error.response && error.response.status === 401) {
                    navigate('/admin-login');
                }
            } finally {
                setLoadingHistory(false);
            }
        };

        fetchSelectedUserHistory();
    }, [selectedUser, navigate]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleBackToList = () => {
        setSelectedUser(null);
        setSelectedUserSubscriptions([]);
        setErrorHistory(null);
    };

    if (loadingUser || loadingInitialList) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500 text-lg">
                Loading subscription management data...
            </div>
        );
    }

    if (errorInitialList) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar user={loggedInUser} onLogout={() => { console.log("Logout initiated from SubscriptionManagement"); }} />
                <div className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Quản lý Gói đăng ký</h1>
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500 text-lg bg-gray-50 rounded-lg p-4">
                        <p>Error: {errorInitialList}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar user={loggedInUser} onLogout={() => { console.log("Logout initiated from SubscriptionManagement"); }} />
            <div className="flex-1 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Quản lý Gói đăng ký</h1>
                    {selectedUser && (
                        <button
                            onClick={handleBackToList}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-gray-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            ← Quay lại danh sách người dùng
                        </button>
                    )}
                </div>

                {!selectedUser ? (
                    <div className="space-y-4 ">
                        {allUsersWithStatus.length === 0 ? (
                            <p className="text-center text-gray-400 text-base py-8 bg-gray-100 rounded-lg">No users found or no package data.</p>
                        ) : (
                            allUsersWithStatus.map(user => (
                                <div
                                    key={user._id}
                                    className="bg-gray-200 p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-300 hover:bg-gray-100 "
                                    onClick={() => handleUserClick(user)}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">

                                        <div className="font-medium text-gray-800">
                                            Người dùng: <span className="font-normal">{user.fullName || user.email || user._id}</span>
                                        </div>

                                        <div>
                                            <span className="font-medium text-gray-800">Trạng thái:</span>{' '}
                                            {user.currentSubscription ? (
                                                <span className="font-semibold text-green-600">{user.currentSubscription.packageName}</span>
                                            ) : (
                                                <span className="font-semibold text-red-500">Hết hạn</span>
                                            )}
                                        </div>

                                        <div>
                                             <span className="font-medium text-gray-800">Ngày bắt đầu:</span>{' '}
                                             {user.currentSubscription ? (
                                                  <span className="font-normal">{moment(user.currentSubscription.startDate).format('DD/MM/YYYY')}</span>
                                             ) : (
                                                  <span className="text-gray-500 font-normal">-</span>
                                             )}
                                        </div>

                                        <div>
                                             <span className="font-medium text-gray-800">Ngày hết hạn:</span>{' '}
                                             {user.currentSubscription ? (
                                                  <span className="font-normal">{moment(user.currentSubscription.endDate).format('DD/MM/YYYY')}</span>
                                             ) : (
                                                  <span className="text-gray-500 font-normal">-</span>
                                             )}
                                        </div>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                            Lịch sử Gói của: {selectedUser.fullName || selectedUser.email || selectedUser._id}
                        </h2>

                        {loadingHistory ? (
                            <div className="flex items-center justify-center text-gray-500 text-base py-8 bg-gray-100 rounded-lg">
                                Loading subscription history...
                            </div>
                        ) : errorHistory ? (
                            <p className="text-red-500 text-base text-center py-8 bg-gray-100 rounded-lg">Error loading history: {errorHistory}</p>
                        ) : selectedUserSubscriptions.length === 0 ? (
                            <p className="text-gray-400 text-base text-center py-8 bg-gray-100 rounded-lg">
                                This user has no subscription history.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {selectedUserSubscriptions.map((sub, index) => (
                                    <div
                                        key={sub._id || index}
                                        className="bg-gray-50 p-4 md:p-5 rounded-lg shadow-sm transition-all border border-gray-200 hover:shadow-md hover:bg-gray-100"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium text-gray-800">Gói:</span> {sub.packageName} ({sub.durationMonths} tháng)
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Giá:</span> {sub.price.toLocaleString('vi-VN')} VNĐ
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Ngày bắt đầu:</span>{' '}
                                                {moment(sub.startDate).format('DD/MM/YYYY HH:mm')}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Ngày kết thúc:</span>{' '}
                                                {moment(sub.endDate).format('DD/MM/YYYY HH:mm')}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Trạng thái:</span>{' '}
                                                <span className={`font-semibold ${sub.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {sub.status === 'active' ? 'Đang hoạt động' : 'Hết hạn'}
                                                </span>
                                            </div>
                                            {sub.transactionId && (
                                                <div>
                                                    <span className="font-medium text-gray-800">Mã giao dịch:</span> {sub.transactionId}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionManagement;