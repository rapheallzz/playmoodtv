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
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider">Video Management</h2>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 bg-[#111] border border-gray-800 rounded-md text-white focus:border-[#541011] outline-none"
        />
        <select
          className="p-2 bg-[#111] border border-gray-800 rounded-md text-white focus:border-[#541011] outline-none"
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
        <button className="px-4 py-2 bg-[#541011] text-white rounded-md hover:bg-red-800 transition-colors font-medium" onClick={handleAddVideo}>
          Add New Video
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-gray-300 border-b border-gray-800 pb-2">All Videos</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? <p className="text-gray-500">Loading...</p> : (
            <ul className="space-y-3">
              {filteredContents.map((content) => (
                <li key={content._id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 flex justify-between items-center transition-all hover:border-gray-700">
                  <div>
                    <p className="font-semibold text-white">{content.title}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-tighter">{content.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 bg-yellow-600/20 text-yellow-500 border border-yellow-600/30 rounded-md text-sm hover:bg-yellow-600 hover:text-white transition-all"
                      onClick={() => handleUpdateContent(content._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-600/20 text-red-500 border border-red-600/30 rounded-md text-sm hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => deleteContents(content._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
        <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-gray-300 border-b border-gray-800 pb-2">Pending Approval</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-3">
              {unapprovedContents.map((content) => (
                <li key={content._id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 flex justify-between items-center transition-all hover:border-gray-700">
                  <div>
                    <p className="font-semibold text-white">{content.title}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-tighter">{content.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-all"
                      onClick={() => handleViewVideo(content.video)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1.5 bg-green-600/20 text-green-500 border border-green-600/30 rounded-md text-sm hover:bg-green-600 hover:text-white transition-all"
                      onClick={() => approveVideo(content._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-600/20 text-red-500 border border-red-600/30 rounded-md text-sm hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => declineVideo(content._id)}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
              {unapprovedContents.length === 0 && <p className="text-gray-500 text-center py-4">No pending approvals</p>}
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