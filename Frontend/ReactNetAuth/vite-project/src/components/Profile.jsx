import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.UserName}</h2>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
