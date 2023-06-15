import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectCurrentUser } from '../redux/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.username}!</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default Profile;