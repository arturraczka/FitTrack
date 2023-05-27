import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <div className="hidden md:block">
            <ul className="flex justify-end items-center">
              <li className="ml-6">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li className="ml-6">
                <Link to="/workoutlist" className="text-gray-600 hover:text-gray-800">
                  Workouts
                </Link>
              </li>
              <li className="ml-6">
                <Link to="/workoutform" className="text-gray-600 hover:text-gray-800">
                  Add Workout
                </Link>
              </li>
              <li className="ml-6">
                <Link to="/about" className="text-gray-600 hover:text-gray-800">
                  About
                </Link>
              </li>
              <li className="ml-6">
                <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <button type="button" className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none" onClick={toggleMenu}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M2 4.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15A.5.5 0 012 4.5zM2.5 9a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zM2 13.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col justify-end items-center">
              <li className="my-2">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li className="my-2">
                <Link to="/workoutlist" className="text-gray-600 hover:text-gray-800">
                  Workouts
                </Link>
              </li>
              <li className="my-2">
                <Link to="/workoutform" className="text-gray-600 hover:text-gray-800">
                  Add Workout
                </Link>
              </li>
              <li className="my-2">
                <Link to="/about" className="text-gray-600 hover:text-gray-800">
                  About
                </Link>
              </li>
              <li className="my-2">
                <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;