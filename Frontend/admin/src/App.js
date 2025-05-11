import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ChatManagement from './pages/ChatManagement';
import AccountManagement from './pages/AccountManagement';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat-management" element={<ChatManagement />} />
        <Route path="/account-management" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
}

export default App;