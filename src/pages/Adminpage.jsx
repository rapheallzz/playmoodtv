import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import PlatformAnalytics from '../components/admin/PlatformAnalytics';
import UserDemographics from '../components/admin/UserDemographics';
import ModerationStats from '../components/admin/ModerationStats';
import CreatorAnalytics from '../components/admin/CreatorAnalytics';
import VideoManagement from '../components/admin/VideoManagement';
import UserManagement from '../components/admin/UserManagement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'dashboard':
        return (
          <div>
            <PlatformAnalytics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <UserDemographics />
              <ModerationStats />
            </div>
          </div>
        );
      case 'creator-analytics':
        return <CreatorAnalytics />;
      case 'videos':
        return <VideoManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#191818]">
      <ToastContainer />
      <div className="w-64 bg-[#0a0a0a] text-white flex flex-col border-r border-[#541011]/30">
        <div className="p-4 border-b border-[#541011]/30">
          <h2 className="text-2xl font-bold text-[#541011]">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <button
            onClick={() => setSelectedSection('dashboard')}
            className={`w-full text-left flex items-center px-4 py-2 text-gray-300 hover:bg-[#541011] hover:text-white rounded-md transition-colors ${selectedSection === 'dashboard' ? 'bg-[#541011] text-white' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelectedSection('creator-analytics')}
            className={`w-full text-left flex items-center px-4 py-2 text-gray-300 hover:bg-[#541011] hover:text-white rounded-md transition-colors ${selectedSection === 'creator-analytics' ? 'bg-[#541011] text-white' : ''}`}
          >
            Creator Analytics
          </button>
          <button
            onClick={() => setSelectedSection('videos')}
            className={`w-full text-left flex items-center px-4 py-2 text-gray-300 hover:bg-[#541011] hover:text-white rounded-md transition-colors ${selectedSection === 'videos' ? 'bg-[#541011] text-white' : ''}`}
          >
            Video Management
          </button>
          <button
            onClick={() => setSelectedSection('users')}
            className={`w-full text-left flex items-center px-4 py-2 text-gray-300 hover:bg-[#541011] hover:text-white rounded-md transition-colors ${selectedSection === 'users' ? 'bg-[#541011] text-white' : ''}`}
          >
            User Management
          </button>
        </nav>
        <div className="p-4 border-t border-[#541011]/30">
          <button
            onClick={onLogout}
            className="w-full bg-[#541011] hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="flex-1 p-6 overflow-y-auto bg-[#191818]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.name || 'Admin'}
          </h1>
        </div>
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;