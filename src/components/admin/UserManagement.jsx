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
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase tracking-tighter border-l-4 border-[#541011] pl-4">User Management</h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="p-4 bg-slate-50 border border-slate-100 rounded-xl w-full text-slate-800 focus:border-[#541011] outline-none transition-all shadow-inner"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-black mb-6 text-slate-700 border-b border-slate-200 pb-3 uppercase tracking-wider">Active Users</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? <p className="text-slate-400 font-medium italic py-4">Loading user base...</p> : (
            <ul className="space-y-4">
              {filteredUsers.map((u) => (
                <li key={u._id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center transition-all hover:shadow-md hover:border-[#541011]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#541011] font-black text-xs border border-slate-200">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-none">{u.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{u.email}</p>
                    </div>
                  </div>
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u._id, e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-bold focus:border-[#541011] outline-none"
                  >
                    <option value="user">USER</option>
                    <option value="creator">CREATOR</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-black mb-6 text-slate-700 border-b border-slate-200 pb-3 uppercase tracking-wider">Creator Requests</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-4">
              {creatorRequests.map((request) => (
                <li key={request._id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center transition-all hover:shadow-md hover:border-[#541011]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#541011]/5 border border-[#541011]/10 flex items-center justify-center text-[#541011] font-black">
                      {request.user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-none">{request.user?.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{request.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-green-50 text-green-600 font-bold border border-green-100 rounded-xl text-xs hover:bg-green-600 hover:text-white transition-all"
                      onClick={() => approveCreatorRequest(request._id)}
                    >
                      APPROVE
                    </button>
                    <button
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold border border-red-100 rounded-xl text-xs hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => declineCreatorRequest(request._id)}
                    >
                      DECLINE
                    </button>
                  </div>
                </li>
              ))}
              {creatorRequests.length === 0 && <p className="text-slate-400 text-center py-10 font-medium italic">All caught up! No requests.</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;