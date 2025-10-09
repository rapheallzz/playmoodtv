import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCreatorWatchTime } from '../../services/analyticsService';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WatchTimeAnalyticsModal = ({ videoId, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchTime = async () => {
      try {
        const result = await getCreatorWatchTime(user.token, videoId);
        setData(result);
      } catch (error) {
        toast.error('Failed to fetch watch time analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchTime();
  }, [user.token, videoId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Watch Time Analytics</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">{data.videoTitle}</h3>
            <p className="mb-4">Average View Duration: {data.averageViewDuration} seconds</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.watchTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="viewers" stroke="#8884d8" name="Viewers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p>No watch time data available.</p>
        )}
      </div>
    </div>
  );
};

export default WatchTimeAnalyticsModal;