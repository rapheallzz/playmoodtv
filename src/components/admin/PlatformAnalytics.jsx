import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPlatformAnalytics } from '../../services/analyticsService';
import { toast } from 'react-toastify';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 flex items-center shadow-xl transition-all hover:border-[#541011]/60">
    <div className="bg-[#541011]/20 text-[#541011] p-4 rounded-xl mr-5 border border-[#541011]/20">
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
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
          <div key={i} className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/10 animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return <p className="text-gray-400">No platform analytics data available.</p>;
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