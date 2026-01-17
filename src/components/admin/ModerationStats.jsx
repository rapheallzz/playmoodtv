import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getModerationStats } from '../../services/analyticsService';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#541011', '#c53030', '#f87171', '#fca5a5', '#fee2e2'];

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
      <div className="bg-white p-8 rounded-2xl border border-gray-100 animate-pulse shadow-sm">
        <div className="h-6 bg-slate-100 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-slate-50 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return <p className="text-slate-400 text-center py-10 font-medium italic">No moderation stats data available.</p>;
  }

  const rejectionData = Object.entries(data.rejectionReasons || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-black mb-8 text-slate-800 border-l-4 border-[#541011] pl-4 uppercase tracking-tighter">
        Content Moderation
      </h3>
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Approved</p>
          <p className="text-4xl font-black text-green-600 tracking-tight">{data.approvedCount}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Rejected</p>
          <p className="text-4xl font-black text-[#541011] tracking-tight">{data.rejectedCount}</p>
        </div>
      </div>
      <h4 className="text-xs font-bold mb-6 text-slate-500 uppercase tracking-widest">Rejection Analysis</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={rejectionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={60}
            stroke="none"
            dataKey="value"
            paddingAngle={5}
          >
            {rejectionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b', fontWeight: 700 }}
          />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 600 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModerationStats;