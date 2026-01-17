import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiClock, FiPlay, FiCalendar, FiX } from 'react-icons/fi';
import BASE_API_URL from '../../apiConfig';

const TVScheduleManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [schedule, setSchedule] = useState({ liveProgram: null, upcomingPrograms: [] });
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    contentId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: ''
  });
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentSearchTerm, setContentSearchTerm] = useState('');

  useEffect(() => {
    fetchSchedule();
    fetchContents();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/api/live-programs/today`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSchedule(response.data);
    } catch (error) {
      toast.error('Failed to fetch schedule.');
    } finally {
      setLoading(false);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/content/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setContents(response.data);
    } catch (error) {
      toast.error('Failed to fetch contents.');
    }
  };

  const handleOpenModal = (program = null) => {
    if (program) {
      setSelectedProgram(program);
      setFormData({
        contentId: program.contentId?._id || program.contentId || '',
        date: program.date ? program.date.split('T')[0] : new Date().toISOString().split('T')[0],
        startTime: program.startTime || ''
      });
      setSelectedContent(program.contentId);
    } else {
      setSelectedProgram(null);
      setFormData({
        contentId: '',
        date: new Date().toISOString().split('T')[0],
        startTime: ''
      });
      setSelectedContent(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contentId || !formData.date || !formData.startTime) {
        toast.error('Please fill all fields');
        return;
    }
    try {
      if (selectedProgram) {
        await axios.put(`${BASE_API_URL}/api/live-programs/${selectedProgram._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success('Program updated successfully');
      } else {
        await axios.post(`${BASE_API_URL}/api/live-programs`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success('Program scheduled successfully');
      }
      setShowModal(false);
      fetchSchedule();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this program from the schedule?')) {
      try {
        await axios.delete(`${BASE_API_URL}/api/live-programs/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success('Program removed');
        fetchSchedule();
      } catch (error) {
        toast.error('Failed to delete program');
      }
    }
  };

  const filteredContents = contents.filter(c =>
    c.title.toLowerCase().includes(contentSearchTerm.toLowerCase())
  );

  const selectContent = (content) => {
    setSelectedContent(content);
    setFormData({ ...formData, contentId: content._id });
    setShowContentModal(false);
  };

  const renderProgramCard = (program, isLive = false) => {
    const content = program.contentId;
    return (
      <div key={program._id} className={`bg-white rounded-2xl border ${isLive ? 'border-[#541011] shadow-lg shadow-[#541011]/10' : 'border-gray-100 shadow-sm'} overflow-hidden transition-all duration-300 hover:shadow-md relative group`}>
        {isLive && (
            <div className="absolute top-3 right-3 bg-[#541011] text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 z-10 animate-pulse">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                LIVE NOW
            </div>
        )}
        <div className="aspect-video bg-gray-200 relative">
            {content?.thumbnail ? (
                <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FiPlay size={32} />
                </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                    onClick={() => handleOpenModal(program)}
                    className="p-2 bg-white text-[#541011] rounded-full hover:bg-[#541011] hover:text-white transition-colors"
                    title="Edit Program"
                >
                    <FiEdit2 size={18} />
                </button>
                <button
                    onClick={() => handleDelete(program._id)}
                    className="p-2 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete Program"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>
        </div>
        <div className="p-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-[#541011] uppercase tracking-widest mb-1">
                <FiClock />
                {program.startTime} - {program.endTime || '??:??'}
            </div>
            <h4 className="font-bold text-slate-800 line-clamp-1">{content?.title || 'Unknown Title'}</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{content?.description || 'No description available'}</p>
            {isLive && program.currentPlaybackTime && (
                <div className="mt-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase">
                        <span>Progress</span>
                        <span>{Math.floor(program.currentPlaybackTime / 60)}m elapsed</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#541011]"
                            style={{ width: `${(program.currentPlaybackTime / (content?.duration || 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter border-l-4 border-[#541011] pl-4">
            TV Program Schedule
          </h2>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-[#541011] text-white rounded-xl hover:bg-red-900 transition-all font-bold shadow-lg shadow-[#541011]/20"
          >
            <FiPlus />
            Schedule Program
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#541011] mx-auto"></div>
            <p className="text-slate-400 mt-4 font-medium italic">Loading schedule...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Live Section */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#541011] rounded-full animate-pulse"></span>
                Currently On Air
              </h3>
              {schedule.liveProgram ? (
                <div className="max-w-md">
                    {renderProgramCard(schedule.liveProgram, true)}
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                  <p className="text-slate-400 font-medium italic">No program is currently live.</p>
                </div>
              )}
            </div>

            {/* Upcoming Section */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Upcoming Today
              </h3>
              {schedule.upcomingPrograms && schedule.upcomingPrograms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {schedule.upcomingPrograms.map(program => renderProgramCard(program))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                  <p className="text-slate-400 font-medium italic">No upcoming programs scheduled for today.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                    {selectedProgram ? 'Edit Scheduled Program' : 'Schedule New Program'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <FiX size={24} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Content</label>
                    <button
                        type="button"
                        onClick={() => setShowContentModal(true)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#541011]/30 transition-all text-left"
                    >
                        {selectedContent ? (
                            <div className="flex items-center gap-3">
                                <img src={selectedContent.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                                <div>
                                    <p className="font-bold text-slate-800 text-sm line-clamp-1">{selectedContent.title}</p>
                                    <p className="text-[10px] font-black text-[#541011] uppercase">{selectedContent.category}</p>
                                </div>
                            </div>
                        ) : (
                            <span className="text-slate-400 font-medium italic">Choose a video...</span>
                        )}
                        <FiSearch className="text-slate-400" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Date</label>
                        <div className="relative">
                            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full p-4 pl-11 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#541011] outline-none font-medium text-slate-700"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Start Time</label>
                        <div className="relative">
                            <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                className="w-full p-4 pl-11 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#541011] outline-none font-medium text-slate-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-[#541011] text-white font-bold rounded-2xl shadow-lg shadow-[#541011]/20 hover:bg-red-900 transition-all"
                    >
                        {selectedProgram ? 'Update Schedule' : 'Confirm Schedule'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* Advanced Content Selection Modal */}
      {showContentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-8 duration-300">
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Select Video Content</h3>
                    <button onClick={() => setShowContentModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <FiX size={24} />
                    </button>
                </div>
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search videos by title or category..."
                        value={contentSearchTerm}
                        onChange={(e) => setContentSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#541011] outline-none font-medium text-slate-700 shadow-inner"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredContents.map(content => (
                        <div
                            key={content._id}
                            onClick={() => selectContent(content)}
                            className="group cursor-pointer flex gap-4 p-3 bg-white border border-slate-100 rounded-2xl hover:border-[#541011] hover:shadow-lg transition-all"
                        >
                            <div className="w-24 aspect-video rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                {content.thumbnail ? (
                                    <img src={content.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <FiPlay size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 group-hover:text-[#541011] transition-colors line-clamp-1">{content.title}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{content.category}</p>
                                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 italic">{content.description}</p>
                            </div>
                        </div>
                    ))}
                    {filteredContents.length === 0 && (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-slate-400 font-medium italic">No content found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-gray-100 flex justify-end">
                <button
                    onClick={() => setShowContentModal(false)}
                    className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all"
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVScheduleManagement;
