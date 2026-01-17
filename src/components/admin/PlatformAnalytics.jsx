import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPlatformAnalytics } from '../../services/analyticsService';
import { toast } from 'react-toastify';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="bg-[#541011]/5 text-[#541011] p-4 rounded-2xl mr-6 border border-[#541011]/10">
      <span className="text-3xl">{icon}</span>
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-widest">{title}</p>
      <p className="text-3xl font-black text-slate-800 tracking-tight">{(value || 0).toLocaleString()}</p>
      {trend !== undefined && (
        <p className="text-[10px] font-bold text-green-500 mt-1 uppercase tracking-tighter">
          +{trend} New Today
        </p>
      )}
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
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 animate-pulse shadow-sm">
            <div className="h-3 bg-slate-100 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-100 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return <p className="text-slate-400 font-medium italic">No platform analytics data available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.users?.total ?? stats.totalUsers}
        icon="👥"
        trend={stats.users?.newSignupsToday}
      />
      <StatCard
        title="Total Creators"
        value={stats.creators?.total ?? stats.totalCreators}
        icon="🎨"
      />
      <StatCard
        title="Total Videos"
        value={stats.content?.total ?? stats.totalVideos}
        icon="🎬"
        trend={stats.content?.newUploadsToday}
      />
      <StatCard
        title="Total Likes"
        value={stats.likes?.total ?? stats.totalLikes}
        icon="❤️"
      />
    </div>
  );
};

export default PlatformAnalytics;