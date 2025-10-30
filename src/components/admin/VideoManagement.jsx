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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Video Management</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
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
        <button className="p-2 bg-blue-600 text-white rounded-md" onClick={handleAddVideo}>
          Add New Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">All Videos</h3>
          <div className="max-h-[500px] overflow-y-auto">
            {loading ? <p>Loading...</p> : (
            <ul>
              {filteredContents.map((content) => (
                <li key={content._id} className="bg-gray-50 p-3 rounded-md mb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{content.title}</p>
                    <p className="text-sm text-gray-500">{content.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-yellow-500 text-white rounded-md"
                      onClick={() => handleUpdateContent(content._id)}
                    >
                      Update
                    </button>
                    <button
                      className="p-2 bg-red-600 text-white rounded-md"
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
        <div>
          <h3 className="text-xl font-semibold mb-2">Unapproved Videos</h3>
          <div className="max-h-[500px] overflow-y-auto">
            <ul>
              {unapprovedContents.map((content) => (
                <li key={content._id} className="bg-gray-50 p-3 rounded-md mb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{content.title}</p>
                    <p className="text-sm text-gray-500">{content.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-gray-500 text-white rounded-md"
                      onClick={() => handleViewVideo(content.video)}
                    >
                      View
                    </button>
                    <button
                      className="p-2 bg-green-500 text-white rounded-md"
                      onClick={() => approveVideo(content._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="p-2 bg-red-600 text-white rounded-md"
                      onClick={() => declineVideo(content._id)}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
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