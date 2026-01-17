import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_API_URL from '../../apiConfig';
import ViewModal from '../ViewModal';
import { VideoModal } from '../ModalVU';
import { UpdateContentModal } from '../UpdateContentModal';

const VideoManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [contents, setContents] = useState([]);
  const [unapprovedContents, setUnapprovedContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateContentModal, setShowUpdateContentModal] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContents();
    fetchUnapprovedContents();
  }, [selectedCategory]);

  const fetchContents = async () => {
    setLoading(true);
    try {
      let url = `${BASE_API_URL}/api/content/`;
      if (selectedCategory && selectedCategory !== 'all') {
        url += `?category=${selectedCategory}`;
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setContents(response.data);
    } catch (error) {
      toast.error('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnapprovedContents = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/content/unapproved`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUnapprovedContents(response.data);
    } catch (error) {
      toast.error('Failed to fetch unapproved videos.');
    }
  };

  const handleViewVideo = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setShowViewModal(true);
  };

  const approveVideo = async (contentId) => {
    try {
      await axios.put(
        `${BASE_API_URL}/api/content/approve/${contentId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Video approved successfully.');
      fetchUnapprovedContents();
      fetchContents();
    } catch (error) {
      toast.error('Failed to approve video.');
    }
  };

  const declineVideo = async (contentId) => {
    try {
      await axios.put(
        `${BASE_API_URL}/api/content/decline/${contentId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Video declined successfully.');
      fetchUnapprovedContents();
    } catch (error) {
      toast.error('Failed to decline video.');
    }
  };

  const deleteContents = async (contentId) => {
    try {
      await axios.delete(
        `${BASE_API_URL}/api/content/${contentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Video deleted successfully.');
      fetchContents();
    } catch (error) {
      toast.error('Failed to delete video.');
    }
  };

  const handleAddVideo = () => setShowVideoModal(true);
  const handleVideoModalClose = () => {
    setShowVideoModal(false);
    fetchContents();
  };
  const handleUpdateContent = (contentId) => {
    setSelectedContentId(contentId);
    setShowUpdateContentModal(true);
  };

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase tracking-tighter border-l-4 border-[#541011] pl-4">Video Management</h2>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:border-[#541011] outline-none shadow-inner"
        />
        <select
          className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:border-[#541011] outline-none shadow-inner font-medium"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="top10">Top 10</option>
          <option value="fashion">Fashion Show</option>
          <option value="teens">Teens</option>
          <option value="documentaries">Documentaries</option>
          <option value="interviews">Interviews</option>
        </select>
        <button className="px-6 py-3 bg-[#541011] text-white rounded-xl hover:bg-red-900 transition-all font-bold shadow-lg shadow-[#541011]/20" onClick={handleAddVideo}>
          Add New Video
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-black mb-6 text-slate-700 border-b border-slate-200 pb-3 uppercase tracking-wider">All Videos</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? <p className="text-slate-400 font-medium italic py-4">Loading content...</p> : (
            <ul className="space-y-4">
              {filteredContents.map((content) => (
                <li key={content._id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center transition-all hover:shadow-md hover:border-[#541011]/20">
                  <div>
                    <p className="font-bold text-slate-800">{content.title}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{content.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-yellow-50 text-yellow-600 font-bold border border-yellow-100 rounded-xl text-xs hover:bg-yellow-600 hover:text-white transition-all"
                      onClick={() => handleUpdateContent(content._id)}
                    >
                      EDIT
                    </button>
                    <button
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold border border-red-100 rounded-xl text-xs hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => deleteContents(content._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-black mb-6 text-slate-700 border-b border-slate-200 pb-3 uppercase tracking-wider">Review Queue</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-4">
              {unapprovedContents.map((content) => (
                <li key={content._id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center transition-all hover:shadow-md hover:border-[#541011]/20">
                  <div>
                    <p className="font-bold text-slate-800">{content.title}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{content.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-800 hover:text-white transition-all"
                      onClick={() => handleViewVideo(content.video)}
                    >
                      VIEW
                    </button>
                    <button
                      className="px-4 py-2 bg-green-50 text-green-600 font-bold border border-green-100 rounded-xl text-xs hover:bg-green-600 hover:text-white transition-all"
                      onClick={() => approveVideo(content._id)}
                    >
                      APPROVE
                    </button>
                    <button
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold border border-red-100 rounded-xl text-xs hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => declineVideo(content._id)}
                    >
                      DECLINE
                    </button>
                  </div>
                </li>
              ))}
              {unapprovedContents.length === 0 && <p className="text-slate-400 text-center py-10 font-medium italic">Your queue is empty!</p>}
            </ul>
          </div>
        </div>
      </div>

      {showViewModal && (
        <ViewModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} videoUrl={selectedVideoUrl} />
      )}
      {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}
      {showUpdateContentModal && (
        <UpdateContentModal contentId={selectedContentId} onClose={() => {
          setShowUpdateContentModal(false);
          fetchContents();
        }} />
      )}
    </div>
  );
};

export default VideoManagement;