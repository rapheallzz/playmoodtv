import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_API_URL from '../../apiConfig';

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
      const response = await axios.get(`${BASE_API_URL}/api/users/`, {
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
      const response = await axios.get(`${BASE_API_URL}/api/rolechange/`, {
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
        `${BASE_API_URL}/api/users/role/${userId}`,
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
        `${BASE_API_URL}/api/rolechange/${requestId}`,
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
        `${BASE_API_URL}/api/rolechange/${requestId}`,
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
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#541011]/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider">User Management</h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="p-3 bg-[#111] border border-gray-800 rounded-lg w-full text-white focus:border-[#541011] outline-none transition-all shadow-inner"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-gray-300 border-b border-gray-800 pb-2">Platform Users</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? <p className="text-gray-500">Loading...</p> : (
            <ul className="space-y-3">
              {filteredUsers.map((u) => (
                <li key={u._id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 flex justify-between items-center transition-all hover:border-gray-700">
                  <div>
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u._id, e.target.value)}
                    className="p-2 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-[#541011] outline-none"
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
        <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-gray-300 border-b border-gray-800 pb-2">Creator Applications</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-3">
              {creatorRequests.map((request) => (
                <li key={request._id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 flex justify-between items-center transition-all hover:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#541011] flex items-center justify-center text-white font-bold">
                      {request.user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{request.user?.name}</p>
                      <p className="text-xs text-gray-500">{request.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 bg-green-600/20 text-green-500 border border-green-600/30 rounded-md text-sm hover:bg-green-600 hover:text-white transition-all"
                      onClick={() => approveCreatorRequest(request._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-600/20 text-red-500 border border-red-600/30 rounded-md text-sm hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => declineCreatorRequest(request._id)}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
              {creatorRequests.length === 0 && <p className="text-gray-500 text-center py-4">No pending requests</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;