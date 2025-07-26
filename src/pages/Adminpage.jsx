import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VideoModal } from '../components/ModalVU';
import { UserModal } from '../components/ModalUser';
import { UpdateContentModal } from '../components/UpdateContentModal';
import axios from 'axios';
import Swal from 'sweetalert2';
import ViewModal from '../components/ViewModal';
import { logout, reset } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isError, message } = useSelector((state) => state.auth);

  if (isError) {
    return <div>Error: {message}</div>;
  }

  const [contents, setContents] = useState([]);
  const [unapprovedContents, setUnapprovedContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to 'all'
  const [showUpdateContentModal, setShowUpdateContentModal] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [creatorRequests, setCreatorRequests] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    fetchContents();
    fetchUnapprovedContents();
    fetchUsers();
    fetchCreatorRequests();
  }, []);

  // Fetch contents when selectedSection changes to 'videos'
  useEffect(() => {
    if (selectedSection === 'videos') {
      fetchContents();
    }
  }, [selectedSection]);

  const handleViewVideo = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setShowViewModal(true);
  };

  const fetchContents = async () => {
    try {
      let url = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/';
      if (selectedCategory && selectedCategory !== 'all') {
        url += `?category=${selectedCategory}`;
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch videos. Status: ${response.status}, ${response.statusText}`);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch videos.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }

      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching videos.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const fetchUnapprovedContents = async () => {
    try {
      const response = await fetch('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/unapproved', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch unapproved videos. Status: ${response.status}, ${response.statusText}`);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch unapproved videos.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }

      const data = await response.json();
      setUnapprovedContents(data);
    } catch (error) {
      console.error('Error fetching unapproved videos:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching unapproved videos.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching users.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const demoteUserRole = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to demote this user to a regular user role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, demote!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/demote/${userId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
          Swal.fire({
            title: 'Success!',
            text: 'User role demoted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          console.error('Failed to demote user:', response.status, response.statusText);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to demote user.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error('Error demoting user:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while demoting the user.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const approveVideo = async (contentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this video?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/approve/${contentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          setUnapprovedContents(unapprovedContents.filter((content) => content._id !== contentId));
          await fetchContents();
          await fetchUnapprovedContents();
          Swal.fire({
            title: 'Success!',
            text: 'Video approved successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          console.error('Failed to approve video:', response.status, response.statusText);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to approve video.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error('Error approving video:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while approving the video.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const declineVideo = async (contentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to decline this video?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, decline!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/decline/${contentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          setUnapprovedContents(unapprovedContents.filter((content) => content._id !== contentId));
          await fetchUnapprovedContents();
          Swal.fire({
            title: 'Success!',
            text: 'Video declined successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          console.error('Failed to decline video:', response.status, response.statusText);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to decline video.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error('Error declining video:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while declining the video.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const fetchCreatorRequests = async () => {
    try {
      const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const uniqueRequests = response.data
        .filter((request, index, self) => 
          index === self.findIndex((r) => r._id === request._id)
        )
        .filter((request) => request.status === 'pending');
      console.log('Fetched creator requests:', uniqueRequests);
      setCreatorRequests(uniqueRequests);
    } catch (error) {
      console.error('Error fetching creator requests:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching creator requests.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const approveCreatorRequest = async (requestId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this creator request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve!',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/${requestId}`,
          { status: 'approved' },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          }
        );
        setCreatorRequests(creatorRequests.filter((request) => request._id !== requestId));
        await fetchUsers();
        Swal.fire({
          title: 'Success!',
          text: 'Creator request approved successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error approving creator request:', error.response?.data || error.message);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while approving the creator request.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const declineCreatorRequest = async (requestId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to decline this creator request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, decline!',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/${requestId}`,
          { status: 'declined' },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          }
        );
        setCreatorRequests(creatorRequests.filter((request) => request._id !== requestId));
        Swal.fire({
          title: 'Success!',
          text: 'Creator request declined successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error declining creator request:', error.response?.data || error.message);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while declining the creator request.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleAddVideo = () => {
    setShowVideoModal(true);
  };

  const handleUserModalClose = () => {
    setShowUserModal(false);
  };

  const handleVideoModalClose = () => {
    setShowVideoModal(false);
  };

  const handleSearch = () => {
    // Add logic to search users based on searchTerm
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedUserRole(role);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchContents();
  };

  const updateContent = async (contentId) => {
    try {
      console.log('Updating Content with ID:', contentId);
      setSelectedContentId(contentId);
      setShowUpdateContentModal(true);
    } catch (error) {
      console.error('Error updating content:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating content.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const deleteContents = async (contentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this video?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!',
    });

    if (result.isConfirmed) {
      try {
        console.log('Deleting video with ID:', contentId);
        // Implement delete logic here
        Swal.fire({
          title: 'Success!',
          text: 'Video deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error deleting video:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while deleting the video.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const updateUserRole = async (userId, role) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change the user role to ${role}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update!',
    });

    if (result.isConfirmed) {
      try {
        console.log('Updating user role:', userId, role);
        // Implement update user role logic here
        Swal.fire({
          title: 'Success!',
          text: 'User role updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error updating user role:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating the user role.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'videos':
        return (
          <div className="flex-1 min-w-[300px] bg-gray-100 border border-gray-300 rounded p-5">
            <h2>Video Management</h2>
            <div className="flex items-center gap-2 mb-2">
              <select
                className="p-2 border border-gray-300 rounded"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                <option value="top10">Top 10</option>
                <option value="fashion">Fashion Show</option>
                <option value="teens">Teens</option>
                <option value="documentaries">Documentaries</option>
                <option value="interviews">Interviews</option>
              </select>
              <button className="p-2 bg-red-900 text-white rounded" onClick={handleAddVideo}>
                Add New Video
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto mb-4">
              <h3 className="text-lg font-semibold mb-2">All Videos</h3>
              <ul className="list-none p-0 m-0">
                {contents.map((content) => (
                  <li key={content._id} className="bg-gray-800 p-2 rounded mb-2 flex justify-between items-center">
                    <div>
                      <p className="m-0 text-white">{content.title}</p>
                      <p className="m-0 text-gray-400 text-sm">Category: {content.category}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="p-2 bg-red-900 text-white rounded"
                        onClick={() => updateContent(content._id)}
                      >
                        Update
                      </button>
                      <button
                        className="p-2 bg-red-900 text-white rounded"
                        onClick={() => deleteContents(content._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Unapproved Videos</h3>
              <ul className="list-none p-0 m-0">
                {unapprovedContents.map((content) => (
                  <li key={content._id} className="bg-gray-800 p-2 rounded mb-2 flex justify-between items-center">
                    <div>
                      <p className="m-0 text-white">{content.title}</p>
                      <p className="m-0 text-gray-400 text-sm">Category: {content.category}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="p-2 bg-red-900 text-white rounded"
                        onClick={() => handleViewVideo(content.video)}
                      >
                        View
                      </button>
                      <button
                        className="p-2 bg-red-900 text-white rounded"
                        onClick={() => approveVideo(content._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="p-2 bg-red-900 text-white rounded"
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
        );

      case 'users':
        return (
          <div className="flex-1 min-w-[300px] bg-gray-100 border border-gray-300 rounded p-5">
            <h2>User Management</h2>
            <div className="mb-4">
              <input
                className="p-2 border border-gray-300 rounded"
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="p-2 bg-red-900 text-white rounded" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">All Users</h3>
              <ul className="list-none p-0 m-0">
                {users
                  .filter(
                    (user) =>
                      user &&
                      (!searchTerm ||
                        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())))
                  )
                  .map((user) => (
                    user ? (
                      <li key={user._id} className="bg-gray-800 p-2 rounded mb-2 flex justify-between items-center">
                        <div>
                          <p className="m-0 text-white">{user.name}</p>
                          <p className="m-0 text-gray-400 text-sm">Email: {user.email}</p>
                          <p className="m-0 text-gray-400 text-sm">Role: {user.role}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                          <select
                            className="p-2 bg-gray-700 text-white rounded"
                            value={user.role}
                            onChange={(e) => updateUserRole(user._id, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="creator">Creator</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            className="p-2 bg-red-900 text-white rounded"
                            onClick={() => demoteUserRole(user._id)}
                          >
                            Demote to User
                          </button>
                        </div>
                      </li>
                    ) : null
                  ))}
              </ul>
            </div>
            <div className="max-h-[400px] overflow-y-auto mt-4">
              <h3 className="text-lg font-semibold mb-2">Creator Requests</h3>
              <ul className="list-none p-0 m-0">
                {creatorRequests.map((request) => (
                  request.user ? (
                    <li key={request._id} className="bg-gray-800 p-2 rounded mb-2 flex justify-between items-center">
                      <div>
                        <p className="m-0 text-white">{request.user.name}</p>
                        <p className="m-0 text-gray-400 text-sm">Email: {request.user.email}</p>
                        <p className="m-0 text-gray-400 text-sm">Status: {request.status}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          className="p-2 bg-red-900 text-white rounded"
                          onClick={() => approveCreatorRequest(request._id)}
                          disabled={request.status !== 'pending'}
                        >
                          Approve
                        </button>
                        <button
                          className="p-2 bg-red-900 text-white rounded"
                          onClick={() => declineCreatorRequest(request._id)}
                          disabled={request.status !== 'pending'}
                        >
                          Decline
                        </button>
                      </div>
                    </li>
                  ) : null
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/4 bg-gray-200 p-4 rounded">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <ul>
            <li>
              <button
                className="bg-[#e72b2b] text-white py-1 px-3 border-none rounded cursor-pointer text-xs transition-colors duration-300 mt-2"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <ul className="list-none p-0">
          <li
            className={`cursor-pointer p-2 rounded mb-2 ${
              selectedSection === 'dashboard' ? 'bg-red-900 text-white' : 'bg-gray-300'
            }`}
            onClick={() => setSelectedSection('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer p-2 rounded mb-2 ${
              selectedSection === 'videos' ? 'bg-red-900 text-white' : 'bg-gray-300'
            }`}
            onClick={() => setSelectedSection('videos')}
          >
            Video Management
          </li>
          <li
            className={`cursor-pointer p-2 rounded mb-2 ${
              selectedSection === 'users' ? 'bg-red-900 text-white' : 'bg-gray-300'
            }`}
            onClick={() => setSelectedSection('users')}
          >
            User Management
          </li>
        </ul>
      </div>
      <div className="flex-1">{renderSection()}</div>
      {showViewModal && (
        <ViewModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} videoUrl={selectedVideoUrl} />
      )}
      {showUserModal && <UserModal onClose={handleUserModalClose} />}
      {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}
      {showUpdateContentModal && (
        <UpdateContentModal contentId={selectedContentId} onClose={() => setShowUpdateContentModal(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;