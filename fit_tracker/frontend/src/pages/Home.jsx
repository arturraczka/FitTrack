import React from 'react';
import { Link } from 'react-router-dom';
import RunningIcon from '../assets/running.svg';
import YogaIcon from '../assets/yoga.svg';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-center text-text mt-10">Welcome to My Fitness App!</h1>
      <p className="text-lg text-center text-text mt-4">Track your workouts and stay fit.</p>
      <div className="flex flex-row items-center justify-center mt-8">
        <Link to="/running" className="flex flex-col items-center justify-center text-center text-text mr-8">
          <img src={RunningIcon} alt="Running Icon" className="w-12 h-12 text-gray-600 mb-2" />
          <span className="text-lg font-bold">Running</span>
        </Link>
        <Link to="/yoga" className="flex flex-col items-center justify-center text-center text-text">
          <img src={YogaIcon} alt="Yoga Icon" className="w-12 h-12 text-gray-600 mb-2" />
          <span className="text-lg font-bold">Yoga</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;