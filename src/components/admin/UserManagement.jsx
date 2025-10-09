import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [creatorRequests, setCreatorRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCreatorRequests();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCreatorRequests = async () => {
    try {
      const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const uniqueRequests = response.data
        .filter((request, index, self) => index === self.findIndex((r) => r._id === request._id))
        .filter((request) => request.status === 'pending');
      setCreatorRequests(uniqueRequests);
    } catch (error) {
      toast.error('Failed to fetch creator requests.');
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/role/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('User role updated successfully.');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user role.');
    }
  };

  const approveCreatorRequest = async (requestId) => {
    try {
      await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/${requestId}`,
        { status: 'approved' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Creator request approved.');
      fetchCreatorRequests();
      fetchUsers();
    } catch (error) {
      toast.error('Failed to approve creator request.');
    }
  };

  const declineCreatorRequest = async (requestId) => {
    try {
      await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/${requestId}`,
        { status: 'declined' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Creator request declined.');
      fetchCreatorRequests();
    } catch (error) {
      toast.error('Failed to decline creator request.');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u &&
      (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="p-2 border border-gray-300 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">All Users</h3>
          <div className="max-h-[500px] overflow-y-auto">
            {loading ? <p>Loading...</p> : (
            <ul>
              {filteredUsers.map((u) => (
                <li key={u._id} className="bg-gray-50 p-3 rounded-md mb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u._id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Creator Requests</h3>
          <div className="max-h-[500px] overflow-y-auto">
            <ul>
              {creatorRequests.map((request) => (
                <li key={request._id} className="bg-gray-50 p-3 rounded-md mb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{request.user?.name}</p>
                    <p className="text-sm text-gray-500">{request.user?.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-green-500 text-white rounded-md"
                      onClick={() => approveCreatorRequest(request._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="p-2 bg-red-600 text-white rounded-md"
                      onClick={() => declineCreatorRequest(request._id)}
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
    </div>
  );
};

export default UserManagement;