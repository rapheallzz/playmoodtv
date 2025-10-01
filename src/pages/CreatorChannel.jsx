// CreatorChannel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import instagram from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import { FaBell, FaHeart, FaComment, FaTwitter,FaInstagram, FaLinkedin, FaTiktok, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import Slidercontent from '../components/Slidercont';
import Footer from '../components/footer/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ContentModal from '../components/ContentModal';
import ErrorPopup from '../components/ErrorPopup';
import useHighlights from '../hooks/useHighlights';
import HighlightsSection from '../components/creator/HighlightsSection';
import HighlightViewer from '../components/creator/HighlightViewer';

// Pulse animation for right arrow
const pulse = keyframes`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`;

// Custom Arrow Components
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft className="arrow-icon" />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <FaChevronRight className="arrow-icon" />
    </div>
  );
};

// Updated Slider Container
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px 0 0; /* Remove left padding, keep right padding */
  margin: 0; /* Remove centering */
  margin-left: 10px; /* Align to the left with minimal offset */

  .slick-slider {
    position: relative;
    touch-action: pan-y; /* Allow vertical scrolling, enable horizontal swipe */
  }

  .slick-list {
    display: flex;
    justify-content: flex-start; /* Align slides to the left */
    margin: 0; /* Remove default margins */
    padding: 0; /* Ensure no padding interferes */
  }

  .slick-track {
    display: flex;
    justify-content: flex-start; /* Ensure slides are left-aligned */
    width: auto !important; /* Prevent track from stretching */
    margin-left: 0; /* Override any default centering */
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: 0; /* Adjust to align with left edge */
    }

    &.next-arrow {
      right: 0; /* Adjust to align with right edge */
      &:hover {
        animation: ${pulse} 1s infinite;
        background: rgba(0, 0, 0, 0.7);
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
    flex-shrink: 0; /* Prevent slides from shrinking */
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px 0 0; /* Remove left padding */
    margin-left: 8px; /* Minimal left offset */
  }

  @media (max-width: 600px) {
    padding: 0 10px 0 0; /* Remove left padding */
    margin-left: 5px; /* Minimal left offset */
  }

  @media (max-width: 480px) {
    padding: 0 10px 0 0; /* Remove left padding */
    margin-left: 5px; /* Minimal left offset */

    .custom-arrow {
      display: none !important;
    }
  }
`;

const PlaylistTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 10px; /* Align with slider content */
`;

// Rest of the CreatorChannel component remains unchanged
export default function CreatorChannel() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentUserId = user?._id || null;
  const [subscribed, setSubscribed] = useState(false);
  const [spank, setSpank] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
  const [activeTab, setActiveTab] = useState('VIDEOS'); // TABS: VIDEOS, PLAYLISTS, COMMUNITY
  const {
    highlights,
    isLoading: isLoadingHighlights,
  } = useHighlights(user, state?.creatorId);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [viewedHighlights, setViewedHighlights] = useState(new Set());

  const handleSelectHighlight = (highlight) => {
    const content = data.find((c) => c._id === highlight.content._id);
    if (content && content.video) {
      setSelectedHighlight({
        ...highlight,
        content: {
          ...highlight.content,
          video: content.video,
        },
      });
      setViewedHighlights((prev) => new Set(prev).add(highlight._id));
    }
  };

  const handleNextHighlight = () => {
    const currentIndex = highlights.findIndex((h) => h._id === selectedHighlight._id);
    if (currentIndex < highlights.length - 1) {
      handleSelectHighlight(highlights[currentIndex + 1]);
    }
  };

  const handlePreviousHighlight = () => {
    const currentIndex = highlights.findIndex((h) => h._id === selectedHighlight._id);
    if (currentIndex > 0) {
      handleSelectHighlight(highlights[currentIndex - 1]);
    }
  };

  // Fetch creator data, subscriber count, and subscription status
  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!state || !state.creatorId) {
        setError('Creator ID is missing.');
        setShowErrorPopup(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        const token = user?.token || localStorage.getItem('token');
        const channelResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${state.creatorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCreatorData(channelResponse.data);
        setData(channelResponse.data.content || []);

        // Check if the current user is in the subscriber list
        if (currentUserId) {
          const isSubscribed = channelResponse.data.subscriberDetails.some(
            (subscriber) => subscriber._id === currentUserId
          );
          setSubscribed(isSubscribed);
        }
      } catch (error) {
        console.error('Error fetching creator data:', error);
        setError('Failed to load creator data.');
        setShowErrorPopup(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreatorData();
  }, [state, user, currentUserId]);

  const handleSubscribeClick = async () => {
    if (!currentUserId) {
      setError('Please log in to subscribe.');
      setShowErrorPopup(true);
      return;
    }

    setSpank(true);
    setTimeout(() => {
      setSpank(false);
    }, 1000);

    try {
      const token = user?.token || localStorage.getItem('token');
      if (!token) {
        setError('Authentication token missing.');
        setShowErrorPopup(true);
        return;
      }
      if (subscribed) {
        await axios.put(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe`,
          { creatorId: state.creatorId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscribed(false);
        setCreatorData((prev) => ({
          ...prev,
          subscribers: prev.subscribers > 0 ? prev.subscribers - 1 : 0,
        }));
      } else {
        await axios.post(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe`,
          { creatorId: state.creatorId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscribed(true);
        setCreatorData((prev) => ({
          ...prev,
          subscribers: prev.subscribers + 1,
        }));
      }
    } catch (err) {
      console.error('Subscription error:', err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          (subscribed ? 'Failed to unsubscribe.' : 'Failed to subscribe.')
      );
      setShowErrorPopup(true);
    }
  };

  

const fetchCommunityPosts = async () => {
  if (!state || !state.creatorId) {
    setError('Creator ID is missing.');
    setShowErrorPopup(true);
    setIsLoadingPosts(false);
    return;
  }

  if (!currentUserId) {
    setError('Please log in to view community posts.');
    setShowErrorPopup(true);
    setIsLoadingPosts(false);
    return;
  }

  setIsLoadingPosts(true);
  setError('');
  try {
    const token = user?.token || localStorage.getItem('token');
    if (!token) {
      setError('Authentication token missing.');
      setShowErrorPopup(true);
      setIsLoadingPosts(false);
      return;
    }

    const response = await axios.get(
      `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${state.creatorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    setCommunityPosts(Array.isArray(response.data) ? response.data : []);
  } catch (err) {
    console.error('Error fetching community posts:', err.response?.data || err.message);
   
    if (
      err.response?.status === 404 ||
      err.response?.data?.message?.toLowerCase().includes('no community posts')
    ) {
      setCommunityPosts([]);
    } else {

      setError(
        err.response?.data?.message || 'Failed to load community posts due to a server error.'
      );
      setShowErrorPopup(true);
      setCommunityPosts([]); 
    }
  } finally {
    setIsLoadingPosts(false);
  }
};

const fetchPlaylists = async () => {
  if (!state || !state.creatorId) {
    setError('Creator ID is missing.');
    setShowErrorPopup(true);
    return;
  }

  setIsLoadingPlaylists(true);
  setError('');
  try {
    // No token is needed for public playlists, but if your API requires it, add it back.
    const response = await axios.get(
      `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/user/${state.creatorId}/public`
    );
    setPlaylists(response.data.playlists || []);
  } catch (err) {
    console.error('Error fetching playlists:', err.response?.data || err.message);
    setError(err.response?.data?.message || 'Failed to load playlists.');
    setShowErrorPopup(true);
    setPlaylists([]);
  } finally {
    setIsLoadingPlaylists(false);
  }
};

  const handleLike = async (postId, isLiked) => {
    if (!currentUserId) {
      setError('Please log in to like posts.');
      setShowErrorPopup(true);
      return;
    }
    try {
      const token = user?.token || localStorage.getItem('token');
      const endpoint = isLiked
        ? `/api/community/${postId}/unlike`
        : `/api/community/${postId}/like`;
      await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommunityPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isLiked
                  ? post.likes.filter((id) => id !== currentUserId)
                  : [...post.likes, currentUserId],
              }
            : post
        )
      );
    } catch (err) {
      console.error('Error liking/unliking post:', err);
      setError('Failed to update like status.');
      setShowErrorPopup(true);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!currentUserId) {
      setError('Please log in to comment.');
      setShowErrorPopup(true);
      return;
    }
    if (!newComment[postId]?.trim()) {
      setError('Comment cannot be empty.');
      setShowErrorPopup(true);
      return;
    }
    try {
      const token = user?.token || localStorage.getItem('token');
      const response = await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}/comment`,
        { content: newComment[postId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommunityPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    _id: response.data.commentId || Date.now(),
                    user: currentUserId,
                    content: newComment[postId],
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment.');
      setShowErrorPopup(true);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'PLAYLISTS' && playlists.length === 0) {
      fetchPlaylists();
    }
    if (tab === 'COMMUNITY' && communityPosts.length === 0) {
      fetchCommunityPosts();
    }
  };

  const handleCardClick = (content) => {
    navigate(`/movie/${content._id}`, {
      state: {
        movie: content.video,
        title: content.title || '',
        desc: content.description || '',
        credits: content.credit || '',
      },
    });
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    setError('');
  };

  const finalIsLoading = isLoading || isLoadingHighlights;

  if (finalIsLoading) {
    return <CreatorChannelSkeleton />;
  }

  if (!creatorData && !finalIsLoading) {
    return null; // ErrorPopup will handle the error display
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipe: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full h-auto overflow-x-hidden flex flex-col items-center bg-black">
      {/* Error Popup */}
      <ErrorPopup
        showPopup={showErrorPopup}
        onClose={closeErrorPopup}
        errorMessage={error}
      />

      {/* Banner Section */}
      <div className="w-full h-auto">
        <div className="bg-slate-400 w-full h-[200px] relative">
          <img
            className="w-full h-full object-cover"
            src={creatorData?.bannerImage || 'https://via.placeholder.com/1200x200'}
            alt="banner"
          />
          <div className="flex w-full sm:w-[200px] absolute right-5 top-[80%] transform -translate-y-[50%] justify-around items-center flex-row gap-[10px] px-2">
            {subscribed && creatorData?.twitter && (
              <a href={creatorData.twitter} target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            )}
            {subscribed && creatorData?.instagram && (
              <a href={creatorData.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            )}
            {subscribed && creatorData?.linkedin && (
              <a href={creatorData.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            )}
            {subscribed && creatorData?.tiktok && (
              <a href={creatorData.tiktok} target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full flex justify-between py-6 px-10">
        <div className="flex gap-5">
          <div className="md:w-24 md:h-24 w-20 h-20 rounded-full bg-white flex items-center justify-center font-semibold">
            <img
              src={creatorData?.profileImage || 'https://via.placeholder.com/80'}
              alt="profile"
              className="md:w-20 md:h-20 w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="gap-2">
            <h2 className="font-semibold text-white">
              {creatorData?.name || 'Creator Name'}
            </h2>
            <h6 className="text-sm text-white">
              {creatorData?.subscribers || 0} subscribers
            </h6>
          </div>
        </div>
        <div className="flex justify-center w-[30%] md:w-[16%]  items-center">
          <button
            className={`bg-[#541011] w-[70%] h-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px] ${spank ? 'spank' : ''}`}
            onClick={handleSubscribeClick}
          >
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
          {/* <FaBell className="text-white" /> */}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full flex justify-between py-6 px-10">
        <div className="flex justify-between md:w-1/3 w-full">
          <a className="text-white text-sm font-medium hover:cursor-pointer" onClick={() => navigate('/')}>
            HOME
          </a>
          <button
            className={`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${activeTab === 'VIDEOS' ? 'underline' : ''}`}
            onClick={() => handleTabClick('VIDEOS')}
          >
            VIDEOS
          </button>
          <button
            className={`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${activeTab === 'PLAYLISTS' ? 'underline' : ''}`}
            onClick={() => handleTabClick('PLAYLISTS')}
          >
            PLAYLIST
          </button>
          <button
            className={`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${activeTab === 'COMMUNITY' ? 'underline' : ''}`}
            onClick={() => handleTabClick('COMMUNITY')}
          >
            COMMUNITY
          </button>
          <button
            className="text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer"
            onClick={openModal}
          >
            ABOUT
          </button>
        </div>
      </div>

      <HighlightsSection
        highlights={highlights}
        onSelectHighlight={handleSelectHighlight}
        viewedHighlights={viewedHighlights}
      />

      {/* Content Section */}
      <div className="w-full min-h-[300px] md:min-h-[500px] bg-[#1a1a1a] px-4 md:px-10 py-8">
        {activeTab === 'VIDEOS' && (
          <>
            <h2 className="text-white font-semibold mb-8">Videos</h2>
            {data.length === 0 ? (
              <NoPosts>No videos available.</NoPosts>
            ) : (
              <SliderContainer>
                <Slider {...sliderSettings}>
                  {data.map((content) => (
                    <div key={content._id} className="slides">
                      <Slidercontent
                        img={content.thumbnail}
                        title={content.title}
                        movie={content}
                        views={content.views}
                        desc={content.description}
                        customStyle={{}}
                        onVideoClick={() => handleOpenModal(content)}
                      />
                    </div>
                  ))}
                </Slider>
              </SliderContainer>
            )}
          </>
        )}

        {activeTab === 'PLAYLISTS' && (
          <div className="w-full">
            {isLoadingPlaylists ? (
              <Loading>Loading playlists...</Loading>
            ) : playlists.length === 0 ? (
              <NoPosts>No public playlists available.</NoPosts>
            ) : (
              playlists.map((playlist) => (
                <div key={playlist._id} className="mb-8">
                  <PlaylistTitle>{playlist.name}</PlaylistTitle>
                  {playlist.videos.length > 0 ? (
                    <SliderContainer>
                      <Slider {...sliderSettings}>
                        {playlist.videos.map((video) => (
                          <div key={video._id} className="slides">
                            <Slidercontent
                              img={video.thumbnail}
                              title={video.title}
                              movie={video}
                              views={video.views}
                              desc={video.description}
                              customStyle={{}}
                              onVideoClick={() => handleOpenModal(video)}
                            />
                          </div>
                        ))}
                      </Slider>
                    </SliderContainer>
                  ) : (
                    <NoPosts style={{ fontSize: '0.9rem', color: '#888' }}>
                      This playlist has no videos.
                    </NoPosts>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'COMMUNITY' && (
          <>
            <h2 className="text-white font-semibold mb-8">Community Posts</h2>
            {isLoadingPosts ? (
              <Loading>Loading posts...</Loading>
            ) : communityPosts.length === 0 ? (
              <NoPosts>No community posts available.</NoPosts>
            ) : (
              <CommunitySection>
                {communityPosts.map((post) => {
                  const isLiked = post.likes.includes(currentUserId);
                  return (
                    <PostWrapper key={post._id}>
                      <PostCard>
                        <PostHeader>
                          <PostProfileImage src={post.user.profileImage} alt={post.user.name} />
                          <div>
                            <PostCreator>{post.user.name}</PostCreator>
                            <PostTimestamp>
                              {new Date(post.timestamp).toLocaleDateString()}
                            </PostTimestamp>
                          </div>
                        </PostHeader>
                        <PostContent>{post.content}</PostContent>
                        <PostActions>
                          <LikeButton
                            isLiked={isLiked}
                            onClick={() => handleLike(post._id, isLiked)}
                          >
                            <FaHeart /> {post.likes.length}
                          </LikeButton>
                          <CommentButton>
                            <FaComment /> {post.comments.length}
                          </CommentButton>
                        </PostActions>
                        <CommentsSection>
                          {post.comments.map((comment) => (
                            <Comment key={comment._id}>
                              <CommentContent>{comment.content}</CommentContent>
                              <CommentTimestamp>
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </CommentTimestamp>
                            </Comment>
                          ))}
                        </CommentsSection>
                        <CommentForm>
                          <CommentInput
                            value={newComment[post._id] || ''}
                            onChange={(e) =>
                              setNewComment((prev) => ({
                                ...prev,
                                [post._id]: e.target.value,
                              }))
                            }
                            placeholder="Add a comment..."
                          />
                          <CommentSubmit
                            onClick={() => handleCommentSubmit(post._id)}
                            disabled={!newComment[post._id]?.trim()}
                          >
                            Post
                          </CommentSubmit>
                        </CommentForm>
                      </PostCard>
                    </PostWrapper>
                  );
                })}
              </CommunitySection>
            )}
          </>
        )}
      </div>

      {/* Modal for Video Click */}
      <ContentModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={handleCloseModal}
        handleNavigateToMovie={handleCardClick}
      />

      {/* Footer */}
     <div className='w-full'>
          <Footer/>
         </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <ModalHeader>
              <ProfileImage
                src={creatorData?.profileImage || 'https://via.placeholder.com/60'}
                alt="Creator Profile"
              />
              <h2>{creatorData?.name || 'Creator Name'}</h2>
            </ModalHeader>
            <ModalBody>
              <p>
                {creatorData?.about || 'No description available.'}
              </p>
              <Subscribers>
                Subscribers: {creatorData?.subscribers || 0}
              </Subscribers>
              {subscribed && (
                <SocialMedia>
                  <h3>Connect with Me</h3>
                  <SocialIcons>
                    {creatorData?.twitter && (
                      <a href={creatorData.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={24} className="hover:text-[#541011]" />
                      </a>
                    )}
                    {creatorData?.instagram && (
                      <a href={creatorData.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} className="hover:text-[#541011]" />
                      </a>
                    )}
                    {creatorData?.linkedin && (
                      <a href={creatorData.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} className="hover:text-[#541011]" />
                      </a>
                    )}
                    {creatorData?.tiktok && (
                      <a href={creatorData.tiktok} target="_blank" rel="noopener noreferrer">
                        <FaTiktok size={24} className="hover:text-[#541011]" />
                      </a>
                    )}
                  </SocialIcons>
                </SocialMedia>
              )}
            </ModalBody>
            <ModalFooter>
              <SubscribeButton
                className={spank ? 'spank' : ''}
                onClick={handleSubscribeClick}
                subscribed={subscribed}
              >
                {subscribed ? 'Unsubscribe' : 'Subscribe'}
              </SubscribeButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {selectedHighlight && (
        <HighlightViewer
          highlight={selectedHighlight}
          onClose={() => setSelectedHighlight(null)}
          onNext={handleNextHighlight}
          onPrevious={handlePreviousHighlight}
          isFirst={highlights.findIndex((h) => h._id === selectedHighlight._id) === 0}
          isLast={
            highlights.findIndex((h) => h._id === selectedHighlight._id) === highlights.length - 1
          }
        />
      )}
    </div>
  );
}

// Existing Styled Components (unchanged)
const CommunitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`;

const PostWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

const PostCard = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const PostProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostCreator = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const PostTimestamp = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const PostContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ccc;
  margin-bottom: 10px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isLiked ? '#541011' : '#ccc')};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }
`;

const CommentsSection = styled.div`
  margin-bottom: 10px;
`;

const Comment = styled.div`
  background: #222;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const CommentContent = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0;
`;

const CommentTimestamp = styled.span`
  font-size: 0.7rem;
  color: #999;
`;

const CommentForm = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #333;
  color: #fff;
`;

const CommentSubmit = styled.button`
  background: #541011;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #fff;
    color: #541011;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #541011;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loading = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
`;

const NoPosts = styled.div`
  color: #ccc;
  text-align: center;
  font-size: 1rem;
  margin: 20px 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  color: #fff;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: #ccc;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;

  p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #ccc;
  }
`;

const Subscribers = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  margin: 10px 0;
`;

const SocialMedia = styled.div`
  h3 {
    font-size: 1rem;
    margin: 10px 0;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #fff;
    transition: color 0.3s ease;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const SubscribeButton = styled.button`
  background-color: ${(props) => (props.subscribed ? '#ccc' : '#541011')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #541011;
  }

  &.spank {
    animation: spank 0.3s ease;
  }

  @keyframes spank {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;