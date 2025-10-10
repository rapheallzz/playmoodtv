import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCreatorDashboard, getCreatorPerformance, getCreatorEngagement } from '../../services/analyticsService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import WatchTimeAnalyticsModal from './WatchTimeAnalyticsModal';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

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
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/creators', {
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
        <div>
          <h4 className="text-lg font-semibold mb-2">{title}</h4>
          <p>No data available.</p>
        </div>
      );
    }

    return (
      <div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        {videos.map(video => (
          <div key={video._id} className="mb-4">
              <p>{video.title}</p>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={[video]} layout="vertical" barSize={20}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="title" hide/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" stackId="a" fill="#82ca9d" name="Likes" />
                    <Bar dataKey="views" stackId="a" fill="#8884d8" name="Views" />
                </BarChart>
            </ResponsiveContainer>
            <button
                onClick={() => setSelectedVideoId(video._id)}
                className="mt-2 text-sm text-blue-600 hover:underline"
            >
                View Watch Time
            </button>
        </div>
      ))}
    </div>
    );
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {selectedVideoId && (
        <WatchTimeAnalyticsModal videoId={selectedVideoId} onClose={() => setSelectedVideoId(null)} />
      )}
      <h2 className="text-2xl font-bold mb-4">Creator Analytics</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3 mb-2"
        />
        <select
          value={selectedCreator}
          onChange={(e) => setSelectedCreator(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
        >
          <option value="">Select a Creator</option>
          {filteredCreators.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading analytics...</p>}

      {!loading && selectedCreator && (
        <div className="space-y-6">
          {dashboardData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center"><p className="text-gray-500">Total Views</p><p className="text-2xl font-bold">{dashboardData.performance.totalViews}</p></div>
                <div className="bg-gray-50 p-4 rounded-lg text-center"><p className="text-gray-500">Total Likes</p><p className="text-2xl font-bold">{dashboardData.performance.totalLikes}</p></div>
                <div className="bg-gray-50 p-4 rounded-lg text-center"><p className="text-gray-500">Subscribers</p><p className="text-2xl font-bold">{dashboardData.audience.totalSubscribers}</p></div>
            </div>
          )}

          {performanceData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderPerformanceChart(performanceData.top5, 'Top 5 Performing Videos')}
              {renderPerformanceChart(performanceData.bottom5, 'Bottom 5 Performing Videos')}
            </div>
          )}

          {engagementData && engagementData.performanceByCategory && (
            <div>
              <h3 className="text-xl font-bold mb-4">Engagement Trends</h3>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Best Performing Content Type</h4>
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={engagementData.performanceByCategory} dataKey="totalViews" nameKey="_id" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                     {engagementData.performanceByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
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