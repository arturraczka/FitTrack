// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../redux/auth/authSlice';

const handleLogout = () => {
  dispatch(logout(token));
};


const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'auth/loginSuccess', payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    dispatch(login({ email: 'user@example.com', password: '7gbiFyBtN4NC!KR' }));
  };

  const handleLogout = () => {
    dispatch(clearAuthState());
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start items-center">
            <Link to="/" className="text-lg font-bold text-gray-800">
              Workout Tracker
            </Link>
            
          </div>
          <div className="hidden md:flex items-center">
          <NavLink to="/signup" className="block text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 py-2 px-4">
              Sign Up
            </NavLink>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
              Logout
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.293 4.293a1 1 0 0 0-1.414 0L12 10.586 5.707 4.293a1 1 0 0 0-1.414 1.414l6.364 6.364a1 1 0 0 0 1.414 0l6.364-6.364a1 1 0 0 0 0-1.414z" />
                ) : (
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm1 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H5z" />
                )}
              </svg>
            </button>
            <div>
            {user ? (
                <div className="mx-auto my-auto cursor-pointer flex justify-between items-center w-16">
                  <FaIcons.FaRegUserCircle />
                  <div>{user && user.username}</div>
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
              ) : (
                <NavLink
                  to="/signup/"
                  className="button signin-button mx-auto"
                  id="nav-desktop-signin-button"
                  title="Sign Up / Log in"
                  aria-label="Sign Up / Log in"
                >
                  Sign Up / Log In
                </NavLink>
              )}
              </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <NavLink to="/signup" className="block text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 py-2 px-4">
              Login
            </NavLink>
            <button onClick={handleLogout} className="block text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 py-2 px-4 mt-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;