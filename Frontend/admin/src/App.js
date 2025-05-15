import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ChatManagement from './pages/ChatManagement';
import AccountManagement from './pages/AccountManagement';
import SubscriptionManagement from './pages/SubscriptionManagement';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat-management" element={<ChatManagement />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/subscrible-management" element={<SubscriptionManagement />} />
      </Routes>
    </Router>
  );
}

export default App;