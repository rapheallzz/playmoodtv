import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {VideoModal} from '../components/ModalVU'
import {UserModal} from '../components/ModalUser'
import { UpdateContentModal } from '../components/UpdateContentModal';



const AdminDashboard = () => {
  const { user, isError, message } = useSelector((state) => state.auth);

if (isError) {
  return <div>Error: {message}</div>;
}

  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUpdateContentModal , setShowUpdateContentModal ] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState(null);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);


  useEffect(() => {

    fetchContents();
    fetchUsers();
  }, []);

  const fetchContents = async () => {
    console.log(contents)  

    try {
      let url = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content';

      if (selectedCategory !== 'all') {
        url += `?category=${selectedCategory}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Failed to fetch videos. Status: ${response.status}, ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const demoteUserRole = async (userId) => {
    try {
      const response = await fetch(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/demote/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Replace with your actual auth token
          },
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
      } else {
        console.error('Failed to demote user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error demoting user:', error);
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
      setSelectedContentId(contentId); // Set the selected video ID
      setShowUpdateContentModal(true);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const deleteContents = async (contentId) => {
    try {
      // Implement logic to delete the video based on the contentId
      console.log('Deleting video with ID:', contentId);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };


  const updateUserRole = async (userId, role) => {
    try {
      // Implement logic to update user role based on userId and role
      console.log('Updating user role:', userId, role);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <AdminDashboardContainer>
            
            <Header>
        <h1>Admin Dashboard</h1>
      </Header>

      {user && user.role === 'admin' ? (
        <AdminContent>
        <Sidebar>
          <SidebarLink href="#">Dashboard</SidebarLink>
          <SidebarLink href="#">Videos</SidebarLink>
          <SidebarLink href="#">Users</SidebarLink>
          {/* Add more sidebar links as needed */}
        </Sidebar>
          
          {/* Video Management Section */}
          <AdminSection>
            <h2>Video Management</h2>
            <VideoFilter>
              <Select name="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">All Categories</option>
                <option value="top10">Top 10</option>
                <option value="fashion">Fashion Show</option>
                <option value="teens">Teens</option>
                <option value="documentaries">Documentaries</option>
                <option value="interviews">Interviews</option>
              </Select>
              <Button onClick={() => setShowVideoModal(true)}>Add New Video</Button>
            </VideoFilter>
            <VideoListContainer>
            <VideoList>
          {contents
            .filter((content) => selectedCategory === '' || content.category === selectedCategory)
            .map((content) => (
              <VideoItem key={content}>
                <p>{content.title}</p>
                <p>{content.id}</p>
                <div>
                   <Button onClick={() => content._id && updateContent(content._id)}>Update</Button>
                  <Button onClick={() => content._id && deleteContents(content._id)}>Delete</Button>
                </div>
              </VideoItem>
            ))}
        </VideoList>

           </VideoListContainer>
          </AdminSection>

          {/* User Management Section */}
          <AdminSection>
            <h2>User Management</h2>
            <UserFilter>
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
              <Button onClick={() => setShowUserModal(true)}>Add New User</Button>
            </UserFilter>
            <UserRoleSelect value={selectedUserRole} onChange={handleRoleChange}>
              <option value="">Select User Role</option>
              <option value="creator">Creator</option>
              <option value="normal">Normal User</option>
              <option value="admin">Admin</option>
            </UserRoleSelect>
            <UserListContainer>
            <UserList>
              {users.map((user) => (
                <UserItem key={user.id}>
                  <p>{user.name}</p>
                  <div>
                    <Button onClick={() => updateUserRole(user.id, selectedUserRole)}>
                      Update Role
                    </Button>
                    <Button onClick={() => demoteUserRole(user.id)}>Demote</Button>
                  </div>
                </UserItem>
              ))}
            </UserList>
            </UserListContainer>
          </AdminSection>

          {/* Modals */}
          {showUserModal && <UserModal onClose={handleUserModalClose} />}
          {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}
          {showUpdateContentModal && (
       <UpdateContentModal
       onClose={() => { setShowUpdateContentModal(false); setSelectedContentId(null); }}
       contentId={selectedContentId}
     />)}
        </AdminContent>
      ) : (
        <UnauthorizedMessage>You do not have permission to access this page.</UnauthorizedMessage>
      )}
    </AdminDashboardContainer>
  );
};


// Add your styling here

const AdminDashboardContainer = styled.div`
  padding: 20px;
`;

const AdminContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AdminSection = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #f8f9fa; /* Background color for each section */
  border: 1px solid #dee2e6; /* Border color */
  border-radius: 8px;
  padding: 20px;
`;

const VideoFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const UserFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const UserRoleSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const VideoListContainer = styled.div`
  max-height: 300px; /* Set the maximum height for the video list */
  overflow-y: auto; /* Enable vertical scrolling if the content exceeds the container height */
`;


const VideoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const VideoItem = styled.li`
  background-color: #292929;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  p {
    margin: 0;
    color: #fff;
  }

  div {
    display: flex;
    gap: 5px;
  }
`;


const UserListContainer = styled.div`
  max-height: 300px; /* Set the maximum height for the video list */
  overflow-y: auto; /* Enable vertical scrolling if the content exceeds the container height */
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  background-color: black;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  p {
    margin: 0;
    color: white;
    font-size: 10px;
  }

  div {
    display: flex;
    gap: 5px;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UnauthorizedMessage = styled.p`
  color: red;
`;

const Header = styled.header`

  color: black;
  padding: 10px;
  text-align: center;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #541011;
  color: white;
  padding: 20px;
`;

const SidebarLink = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px 0;
  border-bottom: 1px solid #555;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

export default AdminDashboard;
