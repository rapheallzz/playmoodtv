import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPlatformAnalytics } from '../../services/analyticsService';
import { toast } from 'react-toastify';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="bg-blue-500 text-white p-3 rounded-full mr-4">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const PlatformAnalytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched || !user?.token) return;

    const fetchAnalytics = async () => {
      try {
        const data = await getPlatformAnalytics(user.token);
        setStats(data);
        setHasFetched(true);
      } catch (error) {
        toast.error('Failed to fetch platform analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.token, hasFetched]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return <p>No platform analytics data available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Users" value={stats.totalUsers} icon="👥" />
      <StatCard title="Total Creators" value={stats.totalCreators} icon="🎨" />
      <StatCard title="Total Videos" value={stats.totalVideos} icon="🎬" />
      <StatCard title="Total Likes" value={stats.totalLikes} icon="❤️" />
    </div>
  );
};

export default PlatformAnalytics;