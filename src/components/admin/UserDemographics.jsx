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
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-6"></div>
        <div className="h-64 bg-gray-800 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 shadow-2xl">
      <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-[#541011] pl-3 uppercase tracking-wider">
        User Demographics by Country
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="country" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111', borderColor: '#541011', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Bar dataKey="userCount" fill="#8b1d1d" name="Number of Users" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDemographics;