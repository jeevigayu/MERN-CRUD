import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { getUsers } from '../services/api';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        console.log('Fetched users:', data);
        setUsers(data);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch users. Please log in again.';
        console.error('Fetch users error:', err.response);
        setError(message);
        toast.error(message);
        localStorage.removeItem('token');
        navigate('/');
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const clearEdit = () => {
    setUserToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">User Dashboard</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <UserForm setUsers={setUsers} userToEdit={userToEdit} clearEdit={clearEdit} />
          <div className="mt-6">
            <UserList users={users} setUsers={setUsers} onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
