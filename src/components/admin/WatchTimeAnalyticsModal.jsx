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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#541011]/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#541011]"></div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Watch Time Analytics</h2>
            <p className="text-[#541011] text-xs font-bold tracking-widest mt-1">REAL-TIME DATA INSIGHTS</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#111] text-gray-400 hover:text-white hover:bg-[#541011] transition-all border border-gray-800"
          >
            &times;
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-[#541011]/20 border-t-[#541011] rounded-full animate-spin"></div>
            <p className="text-gray-500 uppercase text-xs tracking-widest">Analyzing engagement metrics...</p>
          </div>
        ) : data ? (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Video Title</p>
                <h3 className="text-lg font-bold text-white line-clamp-1">{data.videoTitle}</h3>
              </div>
              <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Avg. View Duration</p>
                <h3 className="text-lg font-bold text-white">{data.averageViewDuration} <span className="text-xs font-normal text-gray-400 uppercase">Seconds</span></h3>
              </div>
            </div>

            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Audience Retention Curve</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.watchTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis
                    dataKey="timestamp"
                    stroke="#555"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#555"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111', borderColor: '#541011', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Line
                    type="monotone"
                    dataKey="viewers"
                    stroke="#541011"
                    strokeWidth={3}
                    dot={{ fill: '#541011', strokeWidth: 2, r: 4, stroke: '#1a1a1a' }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    name="Viewers"
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111] rounded-xl border border-dashed border-gray-800">
            <p className="text-gray-500 uppercase text-sm tracking-widest">No retention data available for this content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchTimeAnalyticsModal;