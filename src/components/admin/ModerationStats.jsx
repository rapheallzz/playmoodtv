import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getModerationStats } from '../../services/analyticsService';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ModerationStats = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getModerationStats(user.token);
        setData(result);
      } catch (error) {
        toast.error('Failed to fetch moderation stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.token]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return <p>No moderation stats data available.</p>;
  }

  const rejectionData = Object.entries(data.rejectionReasons || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Content Moderation Stats</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-gray-500">Approved Content</p>
          <p className="text-2xl font-bold">{data.approvedCount}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Rejected Content</p>
          <p className="text-2xl font-bold">{data.rejectedCount}</p>
        </div>
      </div>
      <h4 className="text-lg font-semibold mb-2">Common Rejection Reasons</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={rejectionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {rejectionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModerationStats;