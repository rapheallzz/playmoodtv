import React, { useState } from 'react';
import { FaPaperPlane, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likeContent, unlikeContent } from '../features/authSlice';

const ContentModal = ({ isOpen, content, onClose, handleNavigateToMovie }) => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!isOpen || !content) return null;

  const handleLike = async () => {
    try {
      if (user && user._id) {
        const contentId = content._id;
        const isLiked = user.like && user.like.includes(contentId);

        if (isLiked) {
          await dispatch(unlikeContent({ userId: user._id, contentId }));
        } else {
          await dispatch(likeContent({ userId: user._id, contentId }));
        }
      } else {
        setShowWelcomePopup(true); // Show welcome popup if user is not logged in
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
    }
  };

  const handleCopyLink = () => {
    const pageUrl = window.location.href; // Get current page URL
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10000] top-[-120px] md:top-0 p-4 md:p-8">
      <div className="relative bg-white rounded-lg w-full max-w-lg md:max-w-3xl">
        <button
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-6 h-6 z-[10001]"
          onClick={onClose}
        >
          &times;
        </button>
        <video
          src={`${content.video}#t=0,15`}
          autoPlay
          controls
          className="w-full object-cover rounded-t-lg"
        ></video>
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold">{content.title}</h2>
          <p className="text-sm md:text-base">{content.description}</p>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <button
              onClick={() => handleNavigateToMovie(content)}
              className="bg-[#541011] text-white p-2 rounded w-full md:w-auto mb-2 md:mb-0"
            >
              Watch
            </button>
            <div className="flex items-center gap-4">
              <FaHeart className="text-red-600 cursor-pointer text-xl" onClick={handleLike} />
              <FaPaperPlane className="text-[#541011] cursor-pointer text-xl" onClick={handleCopyLink} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
