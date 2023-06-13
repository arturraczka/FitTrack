import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';

const SignUpLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Register</h2>
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

export default SignUpLogin;