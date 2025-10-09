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
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <a
            href="#"
            onClick={() => setSelectedSection('dashboard')}
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${selectedSection === 'dashboard' ? 'bg-gray-900' : ''}`}
          >
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => setSelectedSection('creator-analytics')}
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${selectedSection === 'creator-analytics' ? 'bg-gray-900' : ''}`}
          >
            Creator Analytics
          </a>
          <a
            href="#"
            onClick={() => setSelectedSection('videos')}
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${selectedSection === 'videos' ? 'bg-gray-900' : ''}`}
          >
            Video Management
          </a>
          <a
            href="#"
            onClick={() => setSelectedSection('users')}
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${selectedSection === 'users' ? 'bg-gray-900' : ''}`}
          >
            User Management
          </a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name || 'Admin'}
          </h1>
        </div>
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;