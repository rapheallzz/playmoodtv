import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import instagram from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import { FaBell, FaHeart, FaComment, FaTwitter, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Slidercontent from '../components/SlidercontPlain';

export default function CreatorChannel() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentUserId = user?._id || null; // Use Redux user._id directly
  const [subscribed, setSubscribed] = useState(false);
  const [spank, setSpank] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isLoadingCreator, setIsLoadingCreator] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState({});

  // Fetch creator data, subscriber count, and subscription status
  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!state || !state.creatorId) {
        setError('Creator ID is missing.');
        return;
      }
  
      setIsLoadingCreator(true);
      setError('');
      try {
        const token = user?.token || localStorage.getItem('token');
        // Fetch channel data
        const channelResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${state.creatorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Set creatorData with the full response, including subscribers
        setCreatorData(channelResponse.data);
        setData(channelResponse.data.content || []);
  
        console.log('creatorData:', channelResponse.data);
  
        // Check if user is subscribed
        if (currentUserId && token) {
          const subscriptionResponse = await axios.get(
            `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com//api/subscribe/subscribers`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const isSubscribed = subscriptionResponse.data.some(
            (sub) => sub.creatorId === state.creatorId
          );
          setSubscribed(isSubscribed);
        }
      } catch (error) {
        console.error('Error fetching creator data:', error);
        setError('Failed to load creator data.');
      } finally {
        setIsLoadingCreator(false);
      }
    };
  
    fetchCreatorData();
  }, [state, user, currentUserId]);


 const handleSubscribeClick = async () => {
  if (!currentUserId) {
    setError('Please log in to subscribe.');
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
      return;
    }
    if (subscribed) {
      // Unsubscribe
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
      // Subscribe
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
  }
};

  const fetchCommunityPosts = async () => {
    if (!state || !state.creatorId) {
      setError('Creator ID is missing.');
      setIsLoadingPosts(false);
      return;
    }

    setIsLoadingPosts(true);
    setError('');
    try {
      const token = user?.token || localStorage.getItem('token');
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
      console.error('Error fetching community posts:', err);
      setError('Failed to load community posts.');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleLike = async (postId, isLiked) => {
    if (!currentUserId) {
      setError('Please log in to like posts.');
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
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!currentUserId) {
      setError('Please log in to comment.');
      return;
    }
    if (!newComment[postId]?.trim()) {
      setError('Comment cannot be empty.');
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
    }
  };

  const toggleCommunity = () => {
    if (!showCommunity) {
      fetchCommunityPosts();
    }
    setShowCommunity(!showCommunity);
  };

  const showVideos = () => {
    setShowCommunity(false);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoadingCreator) {
    return <Loading>Loading creator data...</Loading>;
  }

  if (!creatorData && !isLoadingCreator) {
    return <ErrorMessage>Creator data not available.</ErrorMessage>;
  }

  return (
    <div className="homecontent w-full overflow-x-hidden flex flex-col items-center bg-black">
      {/* Banner Section */}
      <div className="w-full h-auto">
        <div className="bg-slate-400 w-full h-[200px] relative">
          <img
            className="w-full h-full object-cover"
            src={creatorData?.bannerImage || 'https://via.placeholder.com/1200x200'}
            alt="banner"
          />
          <div className="flex w-full sm:w-[200px] absolute right-5 top-[80%] transform -translate-y-[50%] justify-around items-center flex-row gap-[10px] px-2">
            {creatorData?.twitter ? (
              <a href={creatorData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            ) : (
              <FaTwitter className="text-[24px] text-gray-400 cursor-not-allowed" />
            )}
            {creatorData?.instagram ? (
              <a href={creatorData.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            ) : (
              <FaInstagram className="text-[24px] text-gray-400 cursor-not-allowed" />
            )}
            {creatorData?.linkedin ? (
              <a href={creatorData.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            ) : (
              <FaLinkedin className="text-[24px] text-gray-400 cursor-not-allowed" />
            )}
            {creatorData?.tiktok ? (
              <a href={creatorData.tiktok} target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-[24px] text-white cursor-pointer hover:text-[#541011]" />
              </a>
            ) : (
              <FaTiktok className="text-[24px] text-gray-400 cursor-not-allowed" />
            )}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full flex justify-between py-6 px-10">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-full bg-slate-400">
            <img
              src={creatorData?.profileImage || 'https://via.placeholder.com/80'}
              alt="profile"
              className="w-20 h-20 rounded-full"
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
        <div className="flex justify-center items-center">
          <button
            className={`bg-[#541011] w-[70%] h-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px] ${spank ? 'spank' : ''}`}
            onClick={handleSubscribeClick}
          >
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
          <FaBell className="text-white" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full flex justify-between py-6 px-10">
        <div className="flex justify-between md:w-1/3 w-full">
          <a className="text-white text-sm font-medium hover:cursor-pointer" onClick={() => navigate('/')}>
            HOME
          </a>
          <button
            className={`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${!showCommunity ? 'underline' : ''}`}
            onClick={showVideos}
          >
            VIDEOS
          </button>
          <button
            className="text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer"
            onClick={showVideos}
          >
            PLAYLIST
          </button>
          <button
            className={`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${showCommunity ? 'underline' : ''}`}
            onClick={toggleCommunity}
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

      {/* Content or Community Section */}
      <div className="w-[100%] h-auto bg-[#541012]-400 px-10">
        {showCommunity ? (
          <>
            <h2 className="text-white font-semibold my-8">Community Posts</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
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
        ) : (
          <>
            <h2 className="text-white font-semibold my-8">Videos</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {data.length === 0 ? (
              <NoPosts>No videos available.</NoPosts>
            ) : (
              <Content>
                {data.map((content) => (
                  <div
                    className="flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                    key={content._id}
                    onClick={() => handleCardClick(content)}
                  >
                    <Slidercontent
                      img={content.thumbnail}
                      title={content.title}
                      movie={content.video}
                      id={content._id}
                      desc={content.description}
                      customStyle={{}}
                    />
                  </div>
                ))}
              </Content>
            )}
          </>
        )}
      </div>

      {/* Footer */}

               <Footer>
                 <div>
                   <img src={logo} />
                 </div>
                 <div className="instagrams">
                   <div className="instagram-official">
                     <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==">
                       <img src={instagram} />
                     </a>
                     <p className="instagram-links">
                       <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target="_blank">
                         Official
                       </a>
                     </p>
                   </div>
                   <div className="instagram-official">
                     <a href="https://www.instagram.com/playmoodlat/">
                       <img src={instagram} />
                     </a>
                     <p className="instagram-links">
                       <a href="https://www.instagram.com/playmoodlat/" target="_blank">
                         Latam
                       </a>
                     </p>
                   </div>
                   <div className="instagram-official">
                     <a href="https://www.instagram.com/playmoodmx/">
                       <img src={instagram} />
                     </a>
                     <p className="instagram-links">
                       <a href="https://www.instagram.com/playmoodmx/" target="_blank">
                         MX
                       </a>
                     </p>
                   </div>
                 </div>
                 <div></div>
                 <div className="contact-footer">
                   <h2>Contact us:</h2>
                   <h3>Creators@playmoodtv.com</h3>
                   <div>
                     <p onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
                     <p onClick={() => navigate('/cookies')}>Cookies Policy</p>
                   </div>
                   <div>
                     <p>All rights reserved to PlaymoodTV 2023</p>
                   </div>
                 </div>
               </Footer>

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
              <SocialMedia>
                <h3>Connect with Me</h3>
                <SocialIcons>
                  {creatorData?.twitter ? (
                    <a href={creatorData.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter size={24} className="hover:text-[#541011]" />
                    </a>
                  ) : (
                    <FaTwitter size={24} className="text-gray-400 cursor-not-allowed" />
                  )}
                  {creatorData?.instagram ? (
                    <a href={creatorData.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram size={24} className="hover:text-[#541011]" />
                    </a>
                  ) : (
                    <FaInstagram size={24} className="text-gray-400 cursor-not-allowed" />
                  )}
                  {creatorData?.linkedin ? (
                    <a href={creatorData.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={24} className="hover:text-[#541011]" />
                    </a>
                  ) : (
                    <FaLinkedin size={24} className="text-gray-400 cursor-not-allowed" />
                  )}
                  {creatorData?.tiktok ? (
                    <a href={creatorData.tiktok} target="_blank" rel="noopener noreferrer">
                      <FaTiktok size={24} className="hover:text-[#541011]" />
                    </a>
                  ) : (
                    <FaTiktok size={24} className="text-gray-400 cursor-not-allowed" />
                  )}
                </SocialIcons>
              </SocialMedia>
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
    </div>
  );
}

// Styled components
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`;

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

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

const Loading = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  margin: 20px 0;
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

const Footer = styled.div`
  height: fit-content;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px 20px 60px;

  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }

  .instagrams {
    display: flex;
    gap: 5px;

    .instagram-official {
      display: flex;
      height: fit-content;
      align-items: center;
      color: white;

      .instagram-links {
        a {
          text-decoration: none;
          color: white;
        }
      }

      img {
        height: 20px;
        width: 20px;
      }
    }
  }

  div {
    height: fit-content;
    display: flex;
    gap: 10px;
    color: white;

    p {
      font-size: 0.7rem;
      cursor: pointer;
    }

    img {
      height: 80px;
      width: 100%;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    text-align: center;
  }
`;