import React from 'react';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/api';

function UserList({ users, setUsers, onEdit }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      console.log('Deleting user with ID:', id);
      await deleteUser(id);
      setUsers((prev) => {
        const updatedUsers = prev.filter((user) => user._id !== id);
        console.log('Updated users after delete:', updatedUsers);
        return updatedUsers;
      });
      toast.success('User deleted successfully');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete user';
      console.error('Delete error:', err.response);
      toast.error(message);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">Users</h3>
      {users.length === 0 ? (
        <p className="text-muted text-center">No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;