// Navbar.jsx
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { logout, login, selectUser } from '../redux/auth/authSlice';

const handleLogout = () => {
  dispatch(logout(token));
};


const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);


  useEffect(() => {
    if (currentUser) {
      console.log('Logged in user:', currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser && !currentUser) {
      dispatch({ type: 'auth/loginSuccess', payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);


  const handleLogin = () => {
    dispatch(login({ username: 'admin', password: 'Topsy1597.' }));
  };

  const handleLogout = () => {
    dispatch(clearAuthState());
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start items-center">
            <NavLink to="/" className="text-lg font-bold text-gray-800">
              Workout Tracker
            </NavLink>
            
          </div>
          <div className="hidden md:flex items-center">
            <NavLink
              to="/login/"
              className="button signin-button mx-auto"
              id="nav-desktop-signin-button"
              title="Sign Up / Log in"
              aria-label="Sign Up / Log in"
            >
              Sign Up / Log In
            </NavLink>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;