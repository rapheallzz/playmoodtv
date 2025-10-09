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
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">User Demographics by Country</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="userCount" fill="#8884d8" name="Number of Users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDemographics;