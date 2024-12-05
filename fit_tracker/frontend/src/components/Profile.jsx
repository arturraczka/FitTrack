import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectUser, selectStatus, selectError } from '../redux/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await dispatch(fetchUser());
        console.log('User:', userData && userData.email);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getUser();
  }, [dispatch]);

  useEffect(() => {
    console.log('User:', user && user.email);
  }, [user]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user && (
        <>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;