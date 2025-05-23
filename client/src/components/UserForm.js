import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createUser, updateUser } from '../services/api';

function UserForm({ setUsers, userToEdit = null, clearEdit }) {
  const [name, setName] = useState(userToEdit ? userToEdit.name : '');
  const [email, setEmail] = useState(userToEdit ? userToEdit.email : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword('');
      setError('');
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        const { data } = await updateUser(userToEdit._id, { name, email });
        console.log('Update response:', data);
        setUsers((prev) =>
          prev.map((user) => (user._id === userToEdit._id ? data.user : user))
        );
        toast.success('User updated successfully');
        clearEdit();
      } else {
        const { data } = await createUser({ name, email, password });
        console.log('Create response:', data);
        setUsers((prev) => [...prev, data.user]);
        toast.success('User created successfully');
      }
      setName('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      const message = err.response?.data?.message || 'Operation failed';
      console.error('Form error:', err.response);
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="mb-5">
      <h3 className="text-center mb-4">{userToEdit ? 'Edit User' : 'Add User'}</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!userToEdit && (
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary px-4">
            {userToEdit ? 'Update' : 'Add'} User
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;