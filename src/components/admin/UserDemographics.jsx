import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserDemographics } from '../../services/analyticsService';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserDemographics = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const result = await getUserDemographics(user.token);
        setData(result);
      } catch (error) {
        toast.error('Failed to fetch user demographics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDemographics();
  }, [user.token]);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-100 animate-pulse shadow-sm">
        <div className="h-6 bg-slate-100 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-slate-50 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-black mb-8 text-slate-800 border-l-4 border-[#541011] pl-4 uppercase tracking-tighter">
        User Demographics
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="country" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} dy={10} />
          <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b', fontWeight: 700 }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 600 }} />
          <Bar dataKey="userCount" fill="#541011" name="Number of Users" radius={[6, 6, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDemographics;