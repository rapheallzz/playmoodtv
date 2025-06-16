import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import insta from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import { FaHeart, FaEdit, FaPaperPlane, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaTrash, FaComment } from 'react-icons/fa';
import SliderFashion from '../components/miscSlider/SliderFashion';
import { VideoModal } from '../components/ModalVU';
import DonationModal from '../components/DonationModal';
import EditChannelModal from '../components/EditChannelModal';
import { useSelector } from 'react-redux';
import Slidercontent from '../components/SlidercontPlain';

export default function CreatorPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bannerImage, setBannerImage] = useState('');
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [about, setAbout] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [editing, setEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('Uploads');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch channel details
  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const response = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setBannerImage(response.data.bannerImage || '');
        setProfileImage(response.data.profileImage || '');
        setCreatorName(response.data.name || '');
        setAbout(response.data.about || '');
        setInstagram(response.data.instagram || '');
        setTiktok(response.data);
        setLinkedin(response.data);
        setTwitter(response.data.twitter || '');
      } catch (error) {
        console.error('Error fetching channel details:', error);
        setErrorMessage('Failed to load channel details. Please try again later.');
      }
    };

    if (user && user._id) {
      fetchChannelDetails();
    }
  }, [user]);

  // Fetch community posts
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const response = await axios.get(
          'https://playmoodserver-stg-0/api/community/${userId}',
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const posts = Array.isArray(response.data) ? response.data.map(post => ({
          ...post,
          likes: Array.isArray(post.likes) ? post.likes : [],
          comments: Array.isArray(post.comments) ? post.comments : [],
        })) : [];
        setCommunityPosts(posts);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching community posts:', error);
        setErrorMessage('Failed to load community posts. Please try again later.');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    if (user && user._id && activeTab === 'Community') {
      fetchCommunityPosts();
    }
  }, [user, activeTab]);

  const handleUpdateChannelInfo = async () => {
    setIsUpdating(true);
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('name', creatorName);
      formData.append('about', about);
      formData.append('instagram', instagram);
      formData.append('tiktok', tiktok);
      formData.append('linkedin', linkedin);
      formData.append('twitter', twitter);
      if (bannerImageFile) {
        formData.append('bannerImage', bannerImageFile);
      }

      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setBannerImage(response.data.bannerImage || '');
      setProfileImage(response.data.profileImage || '');
      setCreatorName(response.data.name || '');
      setAbout(response.data.about || '');
      setInstagram(response.data.instagram || '');
      setTiktok(response.data.tiktok || '');
      setLinkedin(response.data.linkedin || '');
      setTwitter(response.data.twitter || '');
      setBannerImageFile(null);
      setEditing(false);
      setShowEditModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating channel info:', error);
      setErrorMessage(
        error.response?.data?.message ||
          'Failed to update channel. Please check your inputs or try again later.'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddVideo = () => {
    setShowVideoModal(true);
  };

  const handleVideoModalClose = () => {
    setShowVideoModal(false);
  };

  const handleDonationClick = () => {
    setShowDonationModal(true);
  };

  const handleDonationClose = () => {
    setShowDonationModal(false);
  };

  const handleCommunityClick = () => {
    setActiveTab('Community');
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/create',
        { content: newPostContent },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts([{ ...response.data, likes: Array.isArray(response.data.likes) ? response.data.likes : [], comments: Array.isArray(response.data.comments) ? response.data.comments : [] }, ...communityPosts]);
      setNewPostContent('');
      setShowCommunityModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating community post:', error);
      setErrorMessage('Failed to create post. Please try again later.');
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPostId || !editPostContent.trim()) return;
    try {
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${editingPostId}`,
        { content: editPostContent },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map(post =>
          post._id === editingPostId
            ? { ...post, content: response.data.content, comments: Array.isArray(response.data.comments) ? response.data.comments : [] }
            : post
        )
      );
      setEditPostContent('');
      setEditingPostId(null);
      setShowEditPostModal(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating post:', error);
      setErrorMessage('Failed to update post. Please try again later.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(communityPosts.filter(post => post._id !== postId));
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again later.');
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment[postId]?.trim()) {
      setErrorMessage('Comment cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}/comment`,
        { content: newComment[postId] },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map(post =>
          post._id === postId
            ? {
                ...post,
                comments: Array.isArray(response.data.comments)
                  ? response.data.comments
                  : [
                      ...post.comments,
                      {
                        _id: response.data.commentId || Date.now(),
                        user: { _id: user._id, name: user.name },
                        content: newComment[postId],
                        timestamp: new Date().toISOString(),
                      },
                    ],
              }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: '' }));
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('Failed to add comment. Please try again later.');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map(post =>
          post._id === postId
            ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) }
            : post
        )
      );
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting comment:', error);
      setErrorMessage('Failed to delete comment. Please try again later.');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const post = communityPosts.find(p => p._id === postId);
      const isLiked = Array.isArray(post?.likes) && post.likes.includes(user?._id);
      const endpoint = isLiked
        ? `/api/community/${postId}/unlike`
        : `/api/community/${postId}/like`;
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map((post) =>
          post._id === postId ? { ...post, likes: Array.isArray(response.data.likes) ? response.data.likes : [] } : post
        )
      );
      setErrorMessage('');
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setErrorMessage('Failed to like/unlike post. Please try again later.');
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

  return (
    <Homecontent>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {/* Banner */}
      <BannerSection>
        <BannerImageWrapper>
          <BannerImage src={bannerImage} alt="Channel banner" />
          <SocialIcons>
            {twitter ? (
              <SocialLink href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
            ) : (
              <FaTwitter className="disabled" aria-label="Twitter (disabled)" />
            )}
            {instagram ? (
              <SocialLink href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </SocialLink>
            ) : (
              <FaInstagram className="disabled" aria-label="Instagram (disabled)" />
            )}
            {linkedin ? (
              <SocialLink href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialLink>
            ) : (
              <FaLinkedin className="disabled" aria-label="LinkedIn (disabled)" />
            )}
            {tiktok ? (
              <SocialLink href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok />
              </SocialLink>
            ) : (
              <FaTiktok className="disabled" aria-label="TikTok (disabled)" />
            )}
          </SocialIcons>
        </BannerImageWrapper>
      </BannerSection>

      {/* User Header and Buttons */}
      <UserHeader>
        <ProfileSection>
          <ProfileImageWrapper>
            {profileImage ? (
              <ProfileImage
                src={`${profileImage}?${new Date().getTime()}`}
                alt="Profile"
                onClick={() => navigate('/dashboard')}
              />
            ) : (
              <ProfilePlaceholder />
            )}
          </ProfileImageWrapper>
          <ProfileInfo>
            <h2>{creatorName || user?.name}</h2>
            <h6>{user?.subscribers || 0} subscribers</h6>
          </ProfileInfo>
        </ProfileSection>
        <ButtonGroup>
          <ActionButton onClick={() => setShowCommunityModal(true)} aria-label="Create Community Post">
            Create Post
          </ActionButton>
          <ActionButton onClick={handleAddVideo} aria-label="Upload a Video">
            Upload a Video
          </ActionButton>
          <ActionButton onClick={() => setShowEditModal(true)} aria-label="Edit Channel">
            Edit Channel <FaEdit />
          </ActionButton>
        </ButtonGroup>
      </UserHeader>

      {/* Navigation Links */}
      <Navigation>
        <NavLinks>
          <NavButton
            className={activeTab === 'Uploads' ? 'active' : ''}
            onClick={() => navigate('/')}
            aria-label="Home"
          >
            HOME
          </NavButton>
          <NavButton onClick={handleDonationClick} aria-label="Donations">
            DONATIONS
          </NavButton>
          <NavButton
            className={activeTab === 'Community' ? 'active' : ''}
            onClick={handleCommunityClick}
            aria-label="Community"
          >
            COMMUNITY
          </NavButton>
          <NavButton onClick={handleDonationClick} aria-label="Analytics">
            ANALYTICS
          </NavButton>
        </NavLinks>
      </Navigation>

      {/* Content Section */}
      <ContentSection>
        <SectionTitle>{activeTab === 'Uploads' ? 'Your Uploads' : 'Community Posts'}</SectionTitle>
        {activeTab === 'Uploads' ? (
          <Content>
            {data.length === 0 ? (
              <NoPostsMessage>No uploads yet. Upload a video to get started!</NoPostsMessage>
            ) : (
              data.map((content) => (
                <ContentCard key={content._id} onClick={() => handleCardClick(content)}>
                  <Slidercontent
                    img={content.thumbnail}
                    title={content.title}
                    movie={content.video}
                    id={content._id}
                    desc={content.description}
                    customStyle={{}}
                  />
                </ContentCard>
              ))
            )}
          </Content>
        ) : (
          <CommunitySection>
            {isLoadingPosts ? (
              <LoadingMessage>Loading posts...</LoadingMessage>
            ) : communityPosts.length === 0 ? (
              <NoPostsMessage>No community posts yet. Create one to get started!</NoPostsMessage>
            ) : (
              communityPosts.map((post) => {
                const isLiked = Array.isArray(post.likes) && post.likes.includes(user?._id);
                return (
                  <PostWrapper key={post._id}>
                    <PostCard>
                      <PostHeader>
                        <PostProfileImage src={post.user.profileImage} alt={post.user.name} />
                        <div className="flex-1">
                          <PostCreator>{post.user.name}</PostCreator>
                          <PostTimestamp>{new Date(post.createdAt).toLocaleDateString()}</PostTimestamp>
                        </div>
                        {post.user._id === user?._id && (
                          <div className="flex gap-2">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setEditingPostId(post._id);
                                setEditPostContent(post.content);
                                setShowEditPostModal(true);
                              }}
                              title="Edit Post"
                              aria-label="Edit Post"
                            />
                            <FaTrash
                              className="delete-icon"
                              onClick={() => handleDeletePost(post._id)}
                              title="Delete Post"
                              aria-label="Delete Post"
                            />
                          </div>
                        )}
                      </PostHeader>
                      <PostContent>{post.content}</PostContent>
                      <PostActions>
                        <LikeButton
                          isLiked={isLiked}
                          onClick={() => handleLikePost(post._id)}
                          aria-label={isLiked ? 'Unlike Post' : 'Like Post'}
                        >
                          <FaHeart /> {post.likes.length}
                        </LikeButton>
                        <CommentButton aria-label="View Comments">
                          <FaComment /> {post.comments.length}
                        </CommentButton>
                        <FaPaperPlane
                          className="share-icon"
                          onClick={() => {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url).then(() => alert('URL copied!'));
                          }}
                          title="Share Post"
                          aria-label="Share Post"
                        />
                      </PostActions>
                      <CommentsSection>
                        {post.comments.map((comment) => (
                          <Comment key={comment._id}>
                            <CommentContent>
                              <strong>{comment.user.name || comment.user}</strong>: {comment.content}
                            </CommentContent>
                            <div className="flex items-center gap-2">
                              <CommentTimestamp>
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </CommentTimestamp>
                              {comment.user._id === user?._id && (
                                <FaTrash
                                  className="delete-icon"
                                  onClick={() => handleDeleteComment(post._id, comment._id)}
                                  title="Delete Comment"
                                  aria-label="Delete Comment"
                                />
                              )}
                            </div>
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
                          aria-label="Comment Input"
                        />
                        <CommentSubmit
                          onClick={() => handleAddComment(post._id)}
                          disabled={!newComment[post._id]?.trim()}
                          aria-label="Submit Comment"
                        >
                          Post
                        </CommentSubmit>
                      </CommentForm>
                    </PostCard>
                  </PostWrapper>
                );
              })
            )}
          </CommunitySection>
        )}
      </ContentSection>

      {/* Modals */}
      {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}
      {showEditModal && (
        <EditChannelModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          creatorName={creatorName}
          setCreatorName={setCreatorName}
          about={about}
          setAbout={setAbout}
          instagram={instagram}
          setInstagram={setInstagram}
          tiktok={tiktok}
          setTiktok={setTiktok}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
          twitter={twitter}
          setTwitter={setTwitter}
          bannerImage={bannerImage}
          setBannerImageFile={setBannerImageFile}
          handleUpdateChannelInfo={handleUpdateChannelInfo}
        />
      )}
      <DonationModal
        isOpen={showDonationModal}
        onClose={handleDonationClose}
        onSubmit={() => setShowDonationModal(false)}
      />
      {showCommunityModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>Create Community Post</ModalTitle>
            <ModalTextarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              rows="4"
              aria-label="Community Post Content"
            />
            <ModalButtons>
              <ModalButtonCancel onClick={() => setShowCommunityModal(false)} aria-label="Cancel">
                Cancel
              </ModalButtonCancel>
              <ModalButtonSubmit
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                aria-label="Submit Post"
              >
                Post
              </ModalButtonSubmit>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
      {showEditPostModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>Edit Community Post</ModalTitle>
            <ModalTextarea
              value={editPostContent}
              onChange={(e) => setEditPostContent(e.target.value)}
              placeholder="Update your post..."
              rows="4"
              aria-label="Edit Post Content"
            />
            <ModalButtons>
              <ModalButtonCancel
                onClick={() => {
                  setShowEditPostModal(false);
                  setEditPostContent('');
                  setEditingPostId(null);
                }}
                aria-label="Cancel"
              >
                Cancel
              </ModalButtonCancel>
              <ModalButtonSubmit
                onClick={handleUpdatePost}
                disabled={!editPostContent.trim()}
                aria-label="Save Post"
              >
                Save
              </ModalButtonSubmit>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}

      {/* Footer */}
      <Footer>
        <div>
          <FooterLogo src={logo} alt="PlaymoodTV Logo" />
        </div>
        <div className="instagrams">
          <InstagramLink>
            <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" aria-label="Official PlaymoodTV Instagram">
              <InstagramIcon src={insta} alt="Instagram" />
            </a>
            <p className="instagram-links">
              <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
                Official
              </a>
            </p>
          </InstagramLink>
          <InstagramLink>
            <a href="https://www.instagram.com/playmoodlat/" aria-label="PlaymoodTV Latam Instagram">
              <InstagramIcon src={insta} alt="Instagram" />
            </a>
            <p className="instagram-links">
              <a href="https://www.instagram.com/playmoodlat/" target="_blank" rel="noopener noreferrer">
                Latam
              </a>
            </p>
          </InstagramLink>
          <InstagramLink>
            <a href="https://www.instagram.com/playmoodmx/" aria-label="PlaymoodTV MX Instagram">
              <InstagramIcon src={insta} alt="Instagram" />
            </a>
            <p className="instagram-links">
              <a href="https://www.instagram.com/playmoodmx/" target="_blank" rel="noopener noreferrer">
                MX
              </a>
            </p>
          </InstagramLink>
        </div>
        <div></div>
        <div className="contact-footer">
          <h2>Contact us:</h2>
          <h3>Creators@playmoodtv.com</h3>
          <div>
            <FooterLink onClick={() => navigate('/privacy-policy')} role="button" aria-label="Privacy Policy">
              Privacy Policy
            </FooterLink>
            <FooterLink onClick={() => navigate('/cookies')} role="button" aria-label="Cookies Policy">
              Cookies Policy
            </FooterLink>
          </div>
          <div>
            <p>All rights reserved to PlaymoodTV 2023</p>
          </div>
        </div>
      </Footer>
    </Homecontent>
  );
}

// Styled Components
const Homecontent = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.70);
  overflow-x: hidden;

  > div:not(:last-child) {
    flex: 1 0 auto;
  }
`;

const BannerSection = styled.div`
  width: 100%;
`;

const BannerImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #94a3b8;

  @media screen and (max-width: 768px) {
    height: 150px;
  }

  @media screen and (max-width: 480px) {
    height: 120px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SocialIcons = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
  top: 80%;
  transform: translateY(-50%);
  gap: 10px;
  padding: 5px;

  svg {
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: color 0.3s;

    &.disabled {
      color: #9ca3af;
      cursor: not-allowed;
    }
  }

  @media screen and (max-width: 768px) {
    right: 10px;
    gap: 8px;
    svg {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 480px) {
    top: 70%;
    flex-wrap: wrap;
    justify-content: center;
    right: 5px;
    svg {
      font-size: 18px;
    }
  }
`;

const SocialLink = styled.a`
  color: white;
  &:hover {
    color: #541011;
  }
`;

const UserHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 60px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 16px 20px;
    gap: 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 15px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #94a3b8;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #6b7280;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
  }

  h6 {
    font-size: 0.875rem;
    color: white;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
    h6 {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 480px) {
    h2 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.7rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 45%;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  background-color: #541011;
  color: #f3f3f3;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80%;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: white;
    color: #541011;
  }

  &:last-child {
    width: 40%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 200px;
    font-size: 12px;
    padding: 8px;

    &:last-child {
      width: 100%;
      max-width: 150px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 11px;
    padding: 6px;
  }
`;

const Navigation = styled.div`
  width: 100%;
  padding: 24px 60px;

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 15px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 33.33%;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
`;

const NavButton = styled.button`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;

  &.active {
    text-decoration: underline;
  }

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const ContentSection = styled.div`
  width: 100%;
  padding: 0 60px;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 15px;
  }
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 32px 0;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    margin: 24px 0;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    margin: 16px 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    margin-top: 10%;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    gap: 15px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
    gap: 10px;
  }
`;

const ContentCard = styled.div`
  flex-grow: 1;
  width: 210px;
  max-width: 210px;
  max-height: 310px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 769px) {
    flex: none;
    width: 250px;
    max-width: 250px;
    max-height: 350px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 200px;
    max-height: 280px;
  }

  @media screen and (max-width: 480px) {
    max-width: 160px;
    max-height: 240px;
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
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 5px;
    gap: 15px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
    gap: 10px;
  }
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

  .edit-icon, .delete-icon, .share-icon {
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #541011;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

const PostProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const PostCreator = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const PostTimestamp = styled.span`
  font-size: 0.8rem;
  color: #999;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const PostContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ccc;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const PostActions = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    gap: 10px;
  }
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

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
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

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    padding: 8px;
  }
`;

const CommentContent = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const CommentTimestamp = styled.span`
  font-size: 0.7rem;
  color: #999;

  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const CommentForm = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #333;
  color: #fff;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

const CommentSubmit = styled.button`
  background: #541011;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #fff;
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 16px;
    max-width: 400px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
    max-width: 300px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  resize: vertical;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalButtonCancel = styled.button`
  background-color: #d1d5db;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #9ca3af;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const ModalButtonSubmit = styled.button`
  background-color: #541011;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #fff;
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 8px;
    font-size: 0.8rem;
  }
`;

const LoadingMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  padding: 20px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`;

const NoPostsMessage = styled.div`
  color: #ccc;
  text-align: center;
  font-size: 1rem;
  padding: 20px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`;

const Footer = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px;
  flex-shrink: 0;

  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    h2, h3 {
      margin: 0;
      color: white;
      font-size: 1rem;
    }
  }

  .instagrams {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    text-align: center;
    gap: 15px;

    .instagrams {
      flex-direction: column;
      gap: 10px;
    }

    .contact-footer {
      align-items: center;
      div {
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 480px) {
    padding: 15px;
    .contact-footer h2, .contact-footer h3 {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 320px) {
    padding: 10px;
    .contact-footer h2, .contact-footer h3 {
      font-size: 0.8rem;
    }
  }
`;

const FooterLogo = styled.img`
  height: 80px;
  width: auto;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: 60px;
  }

  @media screen and (max-width: 480px) {
    height: 50px;
  }

  @media screen and (max-width: 320px) {
    height: 40px;
  }
`;

const InstagramLink = styled.div`
  display: flex;
  align-items: center;
  color: white;

  .instagram-links {
    margin-left: 5px;
    a {
      text-decoration: none;
      color: white;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 480px) {
    .instagram-links a {
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 320px) {
    .instagram-links a {
      font-size: 0.6rem;
    }
  }
`;

const InstagramIcon = styled.img`
  height: 20px;
  width: 20px;

  @media screen and (max-width: 480px) {
    height: 18px;
    width: 18px;
  }

  @media screen and (max-width: 320px) {
    height: 16px;
    width: 16px;
  }
`;

const FooterLink = styled.p`
  font-size: 0.7rem;
  cursor: pointer;
  margin: 0;
  color: white;

  @media screen and (max-width: 480px) {
    font-size: 0.65rem;
  }

  @media screen and (max-width: 320px) {
    font-size: 0.6rem;
  }
`;

export { Homecontent };