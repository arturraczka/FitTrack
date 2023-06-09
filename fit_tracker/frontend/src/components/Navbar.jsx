import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, clearAuthState } from '../redux/auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    dispatch(login({ email: 'user@example.com', password: 'password' }));
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
            <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
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
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <button onClick={handleLogin} className="block text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 py-2 px-4">
              Login
            </button>
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