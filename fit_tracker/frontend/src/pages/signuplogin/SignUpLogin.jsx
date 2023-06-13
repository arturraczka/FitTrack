import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../loginform/LoginForm';
import SignInForm from '../signinform/SignInForm';

const Loginsignup = () => {
  
  const [, setUser] = useState({});
  const [form, setForm] = useState('');
  const selector = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };

  const handleAuthClick = () => {
    const token = selector;
    fetch('http://127.0.0.1:8000/user_is_authed', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => data);
  };

  const renderForm = () => {
    switch (form) {
      case 'login':
        return <LoginForm handleLogin={handleLogin} />;
      default:
        return <SignInForm handleLogin={handleLogin} />;
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        type="button"
        className="absolute top-1 left-1 sm:top-4 sm:left-4 hover:bg-indigo-600 text-white bg-green py-1 px-1 sm:py-2 sm:px-4"
        onClick={handleBack}
      >
        &laquo; Go Back
      </button>
      <div className="max-w-md w-full">
        <div className="text-center text-2xl font-bold mb-8">
          <h1 className="text-gray-900">Welcome!</h1>
        </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
          <div className="mt-6">
            <p className="text-center text-sm leading-5 font-medium text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
