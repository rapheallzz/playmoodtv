import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCreatorDashboard, getCreatorPerformance, getCreatorEngagement } from '../../services/analyticsService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import WatchTimeAnalyticsModal from './WatchTimeAnalyticsModal';
import BASE_API_URL from '../../apiConfig';

const COLORS = ['#541011', '#c53030', '#f87171', '#fca5a5', '#fee2e2'];

const CreatorAnalytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [creators, setCreators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [engagementData, setEngagementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/users/creators`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCreators(response.data);
      } catch (error) {
        toast.error('Failed to fetch creators.');
      }
    };
    fetchCreators();
  }, [user.token]);

  useEffect(() => {
    if (!selectedCreator) return;

    const fetchAllAnalytics = async () => {
      setLoading(true);
      try {
        const [dashboard, performance, engagement] = await Promise.all([
          getCreatorDashboard(user.token, selectedCreator),
          getCreatorPerformance(user.token, selectedCreator),
          getCreatorEngagement(user.token, selectedCreator),
        ]);
        setDashboardData(dashboard);
        setPerformanceData(performance);
        setEngagementData(engagement);
      } catch (error) {
        toast.error('Failed to fetch creator analytics.');
        setDashboardData(null);
        setPerformanceData(null);
        setEngagementData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnalytics();
  }, [selectedCreator, user.token]);

  const renderPerformanceChart = (videos, title) => {
    if (!videos || videos.length === 0) {
      return (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-full">
          <h4 className="text-xs font-black mb-6 text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
          <p className="text-slate-400 italic text-center py-10 font-medium">No performance data yet.</p>
        </div>
      );
    }

    return (
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-full flex flex-col">
        <h4 className="text-xs font-black mb-6 text-slate-400 uppercase tracking-[0.2em] border-b border-slate-200 pb-3">{title}</h4>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {videos.map(video => (
            <div key={video._id} className="bg-white p-5 rounded-xl border border-slate-200 transition-all hover:shadow-md hover:border-[#541011]/20 group">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-bold text-slate-800 group-hover:text-[#541011] transition-colors line-clamp-1">{video.title}</p>
                  <button
                      onClick={() => setSelectedVideoId(video._id)}
                      className="text-[10px] font-black uppercase tracking-widest bg-[#541011]/5 text-[#541011] px-3 py-1.5 rounded-lg border border-[#541011]/10 hover:bg-[#541011] hover:text-white transition-all whitespace-nowrap ml-3 shadow-sm"
                  >
                      Retention
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={30}>
                  <BarChart data={[video]} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="title" hide/>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="likes" stackId="a" fill="#541011" name="Likes" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="views" stackId="a" fill="#f87171" name="Views" radius={[0, 4, 4, 0]} />
                  </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-3 text-[9px] text-slate-400 font-black uppercase tracking-[0.15em]">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#541011] mr-1.5"></span>Likes: {video.likes}</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#f87171] mr-1.5"></span>Views: {video.views}</span>
              </div>
          </div>
        ))}
        </div>
      </div>
    );
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
      {selectedVideoId && (
        <WatchTimeAnalyticsModal videoId={selectedVideoId} onClose={() => setSelectedVideoId(null)} />
      )}
      <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase tracking-tighter border-l-4 border-[#541011] pl-4">Creator Analytics</h2>
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-4 bg-slate-50 border border-slate-100 rounded-xl w-full md:w-1/3 text-slate-800 focus:border-[#541011] outline-none transition-all shadow-inner"
        />
        <select
          value={selectedCreator}
          onChange={(e) => setSelectedCreator(e.target.value)}
          className="p-4 bg-slate-50 border border-slate-100 rounded-xl w-full md:w-1/3 text-slate-800 focus:border-[#541011] outline-none transition-all font-bold"
        >
          <option value="">Select a Creator</option>
          {filteredCreators.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-center py-20"><p className="text-slate-400 animate-pulse uppercase tracking-[0.3em] font-black text-xs">Gathering Intelligence</p></div>}

      {!loading && selectedCreator && (
        <div className="space-y-10">
          {dashboardData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">Total Views</p>
                  <p className="text-5xl font-black text-slate-800 tracking-tighter">{(dashboardData.performance?.totalViews || 0).toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">Total Likes</p>
                  <p className="text-5xl font-black text-slate-800 tracking-tighter">{(dashboardData.performance?.totalLikes || 0).toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">Subscribers</p>
                  <p className="text-5xl font-black text-slate-800 tracking-tighter">{(dashboardData.audience?.totalSubscribers || 0).toLocaleString()}</p>
                </div>
            </div>
          )}

          {performanceData && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {renderPerformanceChart(performanceData.top5, 'Top Performing Content')}
              {renderPerformanceChart(performanceData.bottom5, 'Underperforming Content')}
            </div>
          )}

          {engagementData && engagementData.performanceByCategory && (
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-black mb-10 text-slate-800 border-l-4 border-[#541011] pl-4 uppercase tracking-tighter">
                Engagement Trends
              </h3>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <h4 className="text-xs font-black mb-8 text-slate-400 uppercase tracking-widest">Category Distribution (Views)</h4>
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                  data={engagementData.performanceByCategory}
                                  dataKey="totalViews"
                                  nameKey="_id"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={110}
                                  innerRadius={80}
                                  stroke="#f8fafc"
                                  strokeWidth={4}
                                  paddingAngle={4}
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                     {engagementData.performanceByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip
                                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                  itemStyle={{ color: '#1e293b', fontWeight: 700 }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Dominant Category</p>
                          <p className="text-3xl font-black text-slate-800 tracking-tighter">
                            {engagementData.performanceByCategory.length > 0
                              ? [...engagementData.performanceByCategory].sort((a,b) => b.totalViews - a.totalViews)[0]._id
                              : 'N/A'}
                          </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Global Avg Views / Cat</p>
                          <p className="text-3xl font-black text-slate-800 tracking-tighter">
                            {engagementData.performanceByCategory && engagementData.performanceByCategory.length > 0
                              ? Math.round(engagementData.performanceByCategory.reduce((acc, curr) => acc + (curr.totalViews || 0), 0) / engagementData.performanceByCategory.length).toLocaleString()
                              : '0'}
                          </p>
                        </div>
                    </div>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatorAnalytics;