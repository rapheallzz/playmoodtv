import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getModerationStats } from '../../services/analyticsService';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8b1d1d', '#c53030', '#e53e3e', '#fc8181', '#742a2a'];

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
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-6"></div>
        <div className="h-64 bg-gray-800 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return <p className="text-gray-400 text-center py-10">No moderation stats data available.</p>;
  }

  const rejectionData = Object.entries(data.rejectionReasons || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 shadow-2xl">
      <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-[#541011] pl-3 uppercase tracking-wider">
        Content Moderation Stats
      </h3>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-500">{data.approvedCount}</p>
        </div>
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Rejected</p>
          <p className="text-3xl font-bold text-[#541011]">{data.rejectedCount}</p>
        </div>
      </div>
      <h4 className="text-lg font-semibold mb-4 text-gray-300">Common Rejection Reasons</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={rejectionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            stroke="none"
            dataKey="value"
          >
            {rejectionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#111', borderColor: '#541011', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModerationStats;