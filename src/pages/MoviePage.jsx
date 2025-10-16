import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeContent, unlikeContent } from '../features/authSlice';
import axios from 'axios';
import MovieBurger from '../components/headers/MovieBurger';
import instagram from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import profile from '/icon-profile.png';
import { FaPlay, FaHeart, FaBell, FaDonate, FaUser, FaEye, FaLink } from 'react-icons/fa';
import Sliderinterviews from '../components/miscSlider/SliderInterview';
import SliderDocumentaries from '../components/miscSlider/SliderDocumentaries';
import WelcomePopup from '../components/Welcomepop';
import MovieHeader from '../components/headers/MovieHeader';
import Footer from '../components/footer/Footer';

export default function MoviePage() {
  const [info, setInfo] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const COMMENTS_PER_PAGE = 5;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(false);
  const { slug } = useParams();
  const contentId = slug && /^[0-9a-fA-F]{24}$/.test(slug.split('-').pop()) ? slug.split('-').pop() : null;
  const videoRef = useRef(null);
  const lastSavedSecond = useRef(0);

  // Save video progress (only for signed-in users)
  const saveProgress = async (currentTime) => {
    if (!user || !user.token || !contentId) {
      console.warn('Cannot save progress: Missing user, token, or contentId', { user, contentId, currentTime });
      return;
    }
    try {
      console.log('Saving progress for contentId:', contentId, 'time:', currentTime);
      const response = await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/progress/${contentId}`,
        { progress: currentTime },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('Progress saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving video progress:', error.response?.data || error.message);
    }
  };

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current && user) {
      const currentTime = videoRef.current.currentTime;
      const currentSecond = Math.floor(currentTime);

      // Save progress every 5 seconds, but only once per second block
      if (currentSecond > 0 && currentSecond % 5 === 0 && currentSecond !== lastSavedSecond.current) {
        saveProgress(currentTime);
        lastSavedSecond.current = currentSecond;
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && user) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('pause', () => {
        if (video.currentTime > 0) {
          saveProgress(video.currentTime);
        }
      });
    }
    return () => {
      if (video && user && video.currentTime > 0) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('pause', () => saveProgress(video.currentTime));
        saveProgress(video.currentTime);
      }
    };
  }, [contentId, user]);

  useEffect(() => {
    if (user && movie) {
      setIsLiked(user.like.includes(movie._id));
    }
  }, [user, movie]);

  // Fetch movie data and comments separately
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!contentId) {
        console.error('Invalid contentId:', contentId, 'Slug:', slug);
        setError('Invalid movie ID.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch movie data
        const movieResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${contentId}`,
          { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        );
        setMovie(movieResponse.data);

        // Fetch comments
        const commentsResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${contentId}/comments?page=1&limit=${COMMENTS_PER_PAGE}`,
          { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
        );
        setComments(commentsResponse.data.comments || []);
        setHasMore(commentsResponse.data.comments?.length === COMMENTS_PER_PAGE);

        // Fetch user progress
        if (user && user.token) {
          axios.get(
            `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/progress/${contentId}`,
            { headers: { Authorization: `Bearer ${user.token}` } }
          ).then(progressResponse => {
            if (progressResponse.data && progressResponse.data.progress && videoRef.current) {
              const video = videoRef.current;
              const setTime = () => {
                if(video.readyState >= 2) { // HAVE_CURRENT_DATA
                  video.currentTime = progressResponse.data.progress;
                }
              };
              if (video.readyState >= 2) {
                setTime();
              } else {
                video.addEventListener('loadeddata', setTime, { once: true });
              }
            }
          }).catch(error => {
            if (error.response && error.response.status === 404) {
              console.log('No progress found for this content.');
            } else {
              console.error('Error fetching video progress:', error);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching movie:', error.response?.data || error.message);
        setError('Failed to load movie data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [contentId, user, page]);

  // Fetch more comments
  const fetchMoreComments = async () => {
    setCommentLoading(true);
    try {
      const nextPage = page + 1;
      const response = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${contentId}/comments?page=${nextPage}&limit=${COMMENTS_PER_PAGE}`,
        { headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {} }
      );
      setComments([...comments, ...response.data.comments]);
      setPage(nextPage);
      setHasMore(response.data.comments.length === COMMENTS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching more comments:', error.response?.data || error.message);
      setCommentError('Failed to load more comments. Please try again.');
    } finally {
      setCommentLoading(false);
    }
  };

  // Handle comment submission
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      setShowWelcomePopup(true);
      return;
    }
    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    if (!contentId || typeof contentId !== 'string' || contentId.trim() === '') {
      setCommentError('Invalid content ID. Please try again.');
      console.error('Invalid contentId:', contentId);
      return;
    }

    try {
      const commentUrl = `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${contentId}/comment`;
      const payload = {
        contentId: contentId,
        text: commentText
      };
      console.log('Submitting comment:', {
        url: commentUrl,
        payload,
        contentId,
        token: user.token.substring(0, 10) + '...',
      });
      const response = await axios.post(
        commentUrl,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Comment response:', response.data);
      setComments([response.data.comment, ...comments]);
      setCommentText('');
      setCommentError('');
      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.error('Error adding comment:', {
        response: error.response?.data,
        status: error.response?.status,
        message: error.message,
      });
      const errorMessage = error.response?.data?.error || 'Failed to add comment. Please try again.';
      setCommentError(errorMessage);
    }
  };

  // Subscribe to creator
  const handleSubscribeClick = async () => {
    if (!user) {
      setShowWelcomePopup(true);
      return;
    }
    try {
      const response = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/',
        { creatorId: movie?.user?._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.status === 201) {
        setSubscribed(true);
        alert('Subscribed successfully');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  // Unsubscribe from creator
  const handleUnsubscribeClick = async () => {
    if (!user) {
      setShowWelcomePopup(true);
      return;
    }
    try {
      const response = await axios.put(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/',
        { creatorId: movie?.user?._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.status === 200) {
        setSubscribed(false);
        alert('Unsubscribed successfully');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  if (loading) {
    return (
         <LoadingOverlay>
              <LoadingSpinner />
              <Loading>
                    <img src={logo} alt="Loading logo" className="w-32 mb-5 animate-bounce" />
                </Loading>
            </LoadingOverlay>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-black">
        <h1 className="text-2xl font-semibold mb-4 text-white">{error}</h1>
        <button
          className="px-4 py-2 bg-[#541011] text-white rounded-lg hover:bg-white hover:text-[#541011] transition duration-200"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleWatchFromBeginning = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleLikeClick = () => {
    if (!user) {
      setShowWelcomePopup(true);
      return;
    }
    setShowFavoriteMessage(true);
    setTimeout(() => setShowFavoriteMessage(false), 4000);
  };

  const handleCopyLink = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl)
      .then(() => alert('URL copied to clipboard!'))
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const handleHeartClick = async () => {
    if (!user) {
      setShowWelcomePopup(true);
      return;
    }
    try {
      if (isLiked) {
        await dispatch(unlikeContent({ contentId: movie._id })).unwrap();
      } else {
        await dispatch(likeContent({ contentId: movie._id })).unwrap();
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to like/unlike content:', error);
    }
  };

  const toggleInfo = () => {
    setInfo(!info);
  };

  const { title, description, credit, views, like, user: movieUser } = movie;

     const handleCreatorClick = () => {
    if (movieUser?._id) {
      const encodedId = btoa(movieUser._id);
      const creatorSlug = `${movieUser.name.replace(/\s+/g, '-')}-${encodedId}`;
      navigate(`/creator/${creatorSlug}`);
    } else {
      console.warn('Creator ID not available for navigation.');
      // Optionally, show a message to the user
      alert('Creator information is not available.');
    }
  };


  return (
    <Movie>
      <div className="h-auto">
        <MovieHeader />
        {/* Video Holder */}
        <div className="video-container relative mt-20">
          <video
            muted
            playsInline
            autoPlay
            controls
            ref={videoRef}
            controlsList="nodownload"
            className={`object-cover z-1 ${isMinimized ? 'bottom-0 right-0 w-52' : 'w-full h-[550px] static'} md:${
              isMinimized ? 'h-auto' : 'h-[900px]'
            }`}
          >
            <source src={movie?.video} type="video/mp4" />
          </video>
        </div>
        <Hamburger>
          <MovieBurger />
        </Hamburger>
        <div className="movie-title">
          <h1>{title}</h1>
        </div>
        <div className="home-page-icon">
          <img src={logo} alt="" onClick={() => navigate('/')} />
          <img
            src={profile}
            onClick={() => (user ? navigate('/dashboard') : navigate('/login'))}
          />
        </div>
        {/* Main Section */}
        <div className="flex flex-col  md:flex-row w-full gap-[3rem] md:gap-[8rem] h-auto my-[2rem] mx-12">
          {/* Left Section */}
          <div className="w-[100%] md:w-[30%]">
            <div className="mb-3">
              <div className="h-auto w-[300px] md:flex-row my-5 md:my-0">
                <p className="text-[15px] md:text-[12px] sm:text-[10px] p-[15px] md:p-[5px] cursor-pointer text-white hover:text-red-500">
                  Title: {title}
                </p>
                <div className="flex gap-2 px-3 justify-between align-middle my-5">
                  <div className="flex gap-1 items-center">
                    <FaEye className="text-white" />
                    <h6 className="text-white text-[0.6rem]">{views || 0}</h6>
                  </div>
                  <div className="flex gap-1 items-center" onClick={handleHeartClick}>
                    <FaHeart className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-white'}`} />
                    <h6 className="text-white text-[0.6rem]">{like || 0}</h6>
                  </div>
                  <div className="flex gap-1 items-center" onClick={handleCopyLink}>
                    <FaLink className="text-white cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="h-[50px] w-[300px] flex gap-[50px] relative md:p-[5px]">
                <button
                  className="w-[50%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]"
                  onClick={handleWatchFromBeginning}
                >
                  <FaPlay /> Play Again
                </button>
                <button className="w-[50%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]">
                  NEXT VIDEO
                </button>
              </div>
            </div>
            {/* Buttons */}
            <div className="h-[50px] w-[300px] flex gap-[10px] relative md:flex-col p-[5px] mb-0 md:mb-8">
                <button
                className="md:w-[40%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px]"
                onClick={handleCreatorClick}
                disabled={!movieUser?._id} // Disable button if creator ID is not available
              >
                <FaUser /> By: {movieUser ? movieUser.name : 'Playmood'}
              </button>
              <button
                onClick={handleLikeClick}
                className="bg-[#541011] gap-2 md:w-[40%] text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px]"
              >
                <FaDonate /> Donate
              </button>
              <button
                onClick={subscribed ? handleUnsubscribeClick : handleSubscribeClick}
                className={`bg-[#541011] md:w-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px] ${
                  subscribed ? 'btn-danger' : 'btn-success'
                }`}
              >
                <FaBell /> {subscribed ? 'Unsubscribe' : 'Subscribe'}
              </button>
            </div>
          </div>
          {/* Right Section */}
          <div className="mt-1 md:mt-0 h-auto w-[100%] md:w-[30%]">
            <div className="h-auto mr-10 ">
              <div className="flex items-center gap-[30px] h-[50px]">
                <p className="cursor-pointer text-white hover:text-red-500" onClick={() => setInfo(false)}>
                  Information
                </p>
                <button
                  className="gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]"
                  onClick={toggleInfo}
                >
                  Production ~ Credits
                </button>
              </div>
              {/* {showFavoriteMessage && (
                <div className="popup-message fixed top-[200px] right-[100px] bg-[rgba(0,0,0,0.8)] text-white p-[10px_20px] rounded z-[9999] text-[12px] animate-fadeOut">
                  Added to favorites!
                </div>
              )} */}
              <div className='md:mr-0 mr-16'>
                {info ? (
                  <div className="flex items-center justify-between text-white w-[90%] mx-auto">
                    <p>
                      {/* <b>Credits: </b> */}
                      {credit}
                    </p>
                  </div>
                ) : (
                  <div className="text-white w-[100%] h-auto flex md:text-[12px] ">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Comment Section */}
          <div className="md:w-[30%] w-[70%] ">
            <div className="mt-1 md:mt-0 h-auto w-[100%] md:w-[70%] flex flex-col  items-center md:block">
              <h3 className="text-sm font-semibold mt-4 mb-2 text-white">Comments</h3>
              {commentError && <ErrorMessage>{commentError}</ErrorMessage>}
              <CommentForm onSubmit={handleAddComment}>
                <CommentInput
                  type="text"
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    setCommentError('');
                  }}
                  placeholder="Add a comment..."
                  aria-label="Comment input"
                />
                <CommentSubmit type="submit" disabled={!commentText.trim()}>
                  Post
                </CommentSubmit>
              </CommentForm>
              <CommentList>
                {comments && comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <CommentItem key={comment._id || index}>
                      <CommentUser>
                        <CommentProfileImage
                          src={comment.user.profileImage || 'https://via.placeholder.com/32'}
                          alt={comment.user.name}
                        />
                        <div>
                          <CommentUserName>{comment.user.name}</CommentUserName>
                          <CommentTimestamp>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </CommentTimestamp>
                        </div>
                      </CommentUser>
                      <CommentText>{comment.text}</CommentText>
                    </CommentItem>
                  ))
                ) : (
                  <NoComments>No comments yet. Be the first to comment!</NoComments>
                )}
              </CommentList>
              {hasMore && (
                <LoadMoreButton onClick={fetchMoreComments} disabled={commentLoading}>
                  {commentLoading ? 'Loading...' : 'Load More'}
                </LoadMoreButton>
              )}
            </div>
          </div>
        </div>
        {/* Slider Section */}
        <div className="md:my-32">
          <div
            id="interviews"
            className="video-category-four h-[390px] w-[90%] mx-[30px] mb-[40px] flex flex-col md:mx-[20px] md:my-[20px] md:mb-[50px]"
          >
            <h3 className="video-category-title text-white pb-[20px] font-semibold text-[1.5rem] md:text-[1.3rem] lg:text-[1.5rem]">
              Recommended for you
            </h3>
            <Sliderinterviews />
          </div>
          {user && (
            <div
              id="interviews"
              className="video-category-four h-[380px] w-[90%] my-[30px] mx-[50px] mt-[50px] flex flex-col gap-[20px] md:mx-[20px] md:my-[20px] md:mb-[50px]"
            >
              <h3 className="video-category-title text-white pb-[20px] font-semibold text-[1.5rem] md:text-[1.3rem] lg:text-[1.5rem]">
                Continue Watching
              </h3>
              <SliderDocumentaries />
            </div>
          )}
          <WelcomePopup
            showPopup={showWelcomePopup}
            onClose={() => setShowWelcomePopup(false)}
            onLogin={() => setShowWelcomePopup(false)}
            onRegister={() => setShowWelcomePopup(false)}
          />
        </div>
        {/* Footer */}

          <div>
            <Footer/>
          </div>
      </div>
    </Movie>
  );
}

// Styled Components
const Movie = styled.div`
  width: auto;
  height: ${(props) => (props.isMinimized ? '100px' : 'auto')};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: black;
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 10px;
    left: 5px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;
    svg {
      font-size: 40px;
    }
  }
  @media (max-width: 790px) {
    svg {
      position: relative;
      z-index: 1000;
      font-size: 30px;
      top: 6px;
      left: 8px;
    }
  }
`;


const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #541011;
  }
`;

const CommentSubmit = styled.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: #6b1516;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.25rem;

   @media screen and (max-width: 768px) {

  }
`;

const LoadMoreButton = styled.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 0.5rem;
  align-self: center;
  &:hover:not(:disabled) {
    background: #6b1516;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: #1a1a1a;
  border-radius: 4px;
`;

const CommentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentUserName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
`;

const CommentTimestamp = styled.span`
  font-size: 0.625rem;
  color: #999;
`;

const CommentText = styled.p`
  font-size: 0.75rem;
  color: #fff;
  margin: 0;
  line-height: 1.3;
`;

const NoComments = styled.p`
  font-size: 0.75rem;
  color: #999;
  text-align: center;
  margin: 0.5rem 0;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
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