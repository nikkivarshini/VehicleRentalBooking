// src/pages/UserProfile.js
import React from 'react';
import DefaultLayout from '../components/DefaultLayout';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <div>No user information found</div>;
  }

  return (
    <DefaultLayout>
      <div style={{ padding: '20px' }}>
        <h2>User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add other user details here */}
      </div>
    </DefaultLayout>
  );
};

export default UserProfile;
