import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectUser, selectStatus, selectError } from '../redux/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{user && user.name}</h1>
      <p>{user && user.email}</p>
    </div>
  );
};

export default Profile;