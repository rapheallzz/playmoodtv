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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-4xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#541011]/5 rounded-full -mr-32 -mt-32"></div>
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Retention Analytics</h2>
            <div className="flex items-center mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
              <p className="text-[#541011] text-[10px] font-black tracking-[0.2em] uppercase">Intelligence Live Data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-[#541011] hover:bg-[#541011]/10 transition-all border border-slate-100"
          >
            <span className="text-2xl font-light">&times;</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-16 h-16 border-[6px] border-[#541011]/10 border-t-[#541011] rounded-full animate-spin"></div>
            <p className="text-slate-400 uppercase text-[10px] font-black tracking-[0.3em]">Processing Metrics</p>
          </div>
        ) : data ? (
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Target Content</p>
                <h3 className="text-xl font-black text-slate-800 line-clamp-1 tracking-tight">{data.videoTitle}</h3>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Audience Grip</p>
                <h3 className="text-3xl font-black text-[#541011] tracking-tighter">{data.averageViewDuration} <span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Secs Avg</span></h3>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Drop-off Analysis</h4>
                <div className="px-3 py-1 bg-[#541011]/5 rounded-full">
                  <span className="text-[10px] font-bold text-[#541011]">TIME-BASED VIEWERS</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data.watchTimeData} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="timestamp"
                    stroke="#cbd5e1"
                    fontSize={10}
                    fontWeight={700}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#cbd5e1"
                    fontSize={10}
                    fontWeight={700}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 800, fontSize: '12px' }}
                  />
                  <Line
                    type="step"
                    dataKey="viewers"
                    stroke="#541011"
                    strokeWidth={4}
                    dot={{ fill: '#fff', strokeWidth: 3, r: 6, stroke: '#541011' }}
                    activeDot={{ r: 8, stroke: '#541011', strokeWidth: 4, fill: '#fff' }}
                    name="ACTIVE VIEWERS"
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 uppercase text-xs font-black tracking-[0.2em]">Data Unavailable for this segment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchTimeAnalyticsModal;