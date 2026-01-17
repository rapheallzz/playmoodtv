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
import TVScheduleManagement from '../components/admin/TVScheduleManagement';
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
      case 'tv-schedule':
        return <TVScheduleManagement />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f7fe]">
      <ToastContainer />
      <div className="w-64 bg-[#0a0a0a] text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-black text-[#541011] tracking-tighter">PLAYMOOD</h2>
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-1">ADMIN PORTAL</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-4">
          <button
            onClick={() => setSelectedSection('dashboard')}
            className={`w-full text-left flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedSection === 'dashboard' ? 'bg-[#541011] text-white shadow-lg shadow-[#541011]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelectedSection('creator-analytics')}
            className={`w-full text-left flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedSection === 'creator-analytics' ? 'bg-[#541011] text-white shadow-lg shadow-[#541011]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Creator Analytics
          </button>
          <button
            onClick={() => setSelectedSection('videos')}
            className={`w-full text-left flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedSection === 'videos' ? 'bg-[#541011] text-white shadow-lg shadow-[#541011]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Video Management
          </button>
          <button
            onClick={() => setSelectedSection('users')}
            className={`w-full text-left flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedSection === 'users' ? 'bg-[#541011] text-white shadow-lg shadow-[#541011]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            User Management
          </button>
          <button
            onClick={() => setSelectedSection('tv-schedule')}
            className={`w-full text-left flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedSection === 'tv-schedule' ? 'bg-[#541011] text-white shadow-lg shadow-[#541011]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            TV Schedule
          </button>
        </nav>
        <div className="p-6">
          <button
            onClick={onLogout}
            className="w-full bg-[#541011] hover:bg-red-900 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-[#541011]/20"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1e293b] tracking-tight">
              Welcome back, {user?.name || 'Admin'}
            </h1>
            <p className="text-gray-500 font-medium">Here's what's happening on your platform today.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;