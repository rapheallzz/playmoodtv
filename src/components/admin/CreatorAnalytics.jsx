import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCreatorDashboard, getCreatorPerformance, getCreatorEngagement } from '../../services/analyticsService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import WatchTimeAnalyticsModal from './WatchTimeAnalyticsModal';
import BASE_API_URL from '../../apiConfig';

const COLORS = ['#541011', '#8b1d1d', '#c53030', '#e53e3e', '#742a2a'];

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
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 h-full">
          <h4 className="text-lg font-semibold mb-4 text-gray-300 uppercase tracking-wider">{title}</h4>
          <p className="text-gray-500 italic text-center py-10">No data available.</p>
        </div>
      );
    }

    return (
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800 h-full flex flex-col">
        <h4 className="text-lg font-semibold mb-6 text-gray-300 uppercase tracking-wider border-b border-gray-800 pb-2">{title}</h4>
        <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {videos.map(video => (
            <div key={video._id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 transition-all hover:border-[#541011]/50 group">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-medium text-white group-hover:text-[#541011] transition-colors line-clamp-1">{video.title}</p>
                  <button
                      onClick={() => setSelectedVideoId(video._id)}
                      className="text-xs bg-[#541011]/10 text-[#541011] px-2 py-1 rounded border border-[#541011]/20 hover:bg-[#541011] hover:text-white transition-all whitespace-nowrap ml-2"
                  >
                      Watch Time
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={40}>
                  <BarChart data={[video]} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="title" hide/>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#111', borderColor: '#541011', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Bar dataKey="likes" stackId="a" fill="#8b1d1d" name="Likes" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="views" stackId="a" fill="#e53e3e" name="Views" radius={[0, 4, 4, 0]} />
                  </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span>Likes: {video.likes}</span>
                <span>Views: {video.views}</span>
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
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 shadow-2xl">
      {selectedVideoId && (
        <WatchTimeAnalyticsModal videoId={selectedVideoId} onClose={() => setSelectedVideoId(null)} />
      )}
      <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider">Creator Analytics</h2>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 bg-[#111] border border-gray-800 rounded-lg w-full md:w-1/3 text-white focus:border-[#541011] outline-none transition-all shadow-inner"
        />
        <select
          value={selectedCreator}
          onChange={(e) => setSelectedCreator(e.target.value)}
          className="p-3 bg-[#111] border border-gray-800 rounded-lg w-full md:w-1/3 text-white focus:border-[#541011] outline-none transition-all"
        >
          <option value="">Select a Creator</option>
          {filteredCreators.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-center py-20"><p className="text-gray-500 animate-pulse uppercase tracking-widest">Gathering analytics intelligence...</p></div>}

      {!loading && selectedCreator && (
        <div className="space-y-8">
          {dashboardData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center transition-all hover:border-[#541011]/30">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Total Views</p>
                  <p className="text-4xl font-bold text-white">{dashboardData.performance.totalViews.toLocaleString()}</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center transition-all hover:border-[#541011]/30">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Total Likes</p>
                  <p className="text-4xl font-bold text-white">{dashboardData.performance.totalLikes.toLocaleString()}</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center transition-all hover:border-[#541011]/30">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Subscribers</p>
                  <p className="text-4xl font-bold text-white">{dashboardData.audience.totalSubscribers.toLocaleString()}</p>
                </div>
            </div>
          )}

          {performanceData && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {renderPerformanceChart(performanceData.top5, 'Top 5 Performing Videos')}
              {renderPerformanceChart(performanceData.bottom5, 'Bottom 5 Performing Videos')}
            </div>
          )}

          {engagementData && engagementData.performanceByCategory && (
            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-8 text-white border-l-4 border-[#541011] pl-3 uppercase tracking-wider">
                Engagement Trends
              </h3>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-400">Content Performance by Category</h4>
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                  data={engagementData.performanceByCategory}
                                  dataKey="totalViews"
                                  nameKey="_id"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={100}
                                  stroke="none"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                     {engagementData.performanceByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip
                                  contentStyle={{ backgroundColor: '#111', borderColor: '#541011', borderRadius: '8px' }}
                                  itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-800">
                          <p className="text-gray-500 text-xs uppercase mb-1">Top Performing Category</p>
                          <p className="text-2xl font-bold text-white">
                            {engagementData.performanceByCategory.length > 0
                              ? [...engagementData.performanceByCategory].sort((a,b) => b.totalViews - a.totalViews)[0]._id
                              : 'N/A'}
                          </p>
                        </div>
                        <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-800">
                          <p className="text-gray-500 text-xs uppercase mb-1">Average Views per Category</p>
                          <p className="text-2xl font-bold text-white">
                            {engagementData.performanceByCategory.length > 0
                              ? Math.round(engagementData.performanceByCategory.reduce((acc, curr) => acc + curr.totalViews, 0) / engagementData.performanceByCategory.length).toLocaleString()
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