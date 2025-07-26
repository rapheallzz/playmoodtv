import React from 'react';
import { StlyedCommunitySection, PostWrapper, PostCard, PostHeader, PostProfileImage, PostCreator, PostTimestamp, PostContent, PostActions, LikeButton, CommentButton, CommentsSection, Comment, CommentContent, CommentTimestamp, CommentForm, CommentInput, CommentSubmit, } from '../../styles/CreatorPageStyles';
import { FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaHeart, FaEdit, FaPaperPlane, FaComment, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

const CommunitySection = ({
  communityPosts,
  isLoadingPosts,
  user,
  handleLikePost,
  handleDeletePost,
  setShowEditPostModal,
  setEditingPostId,
  setEditPostContent,
  newComment,
  setNewComment,
  handleAddComment,
  handleDeleteComment,
}) => (
  <StlyedCommunitySection>
    {isLoadingPosts ? (
      <div>Loading posts...</div>
    ) : communityPosts.length === 0 ? (
      <div>No community posts yet. Create one to get started!</div>
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
                {post.user_id === user?._id && (
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
  </StlyedCommunitySection>
);

export default CommunitySection;