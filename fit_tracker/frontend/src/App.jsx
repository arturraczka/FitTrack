import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from '../src/components/WorkoutList';

const App = () => {
  const workouts = useSelector((state) => state.formData);
  console.log(workouts);

  const defaultWorkouts = [
    { id: 1, name: 'Pushups', duration: 10 },
    { id: 2, name: 'Squats', duration: 15 },
    { id: 3, name: 'Lunges', duration: 20 },
  ];

  const workoutList = workouts.length > 0 ? workouts : defaultWorkouts;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Workout Tracker App!</h1>} />
        <Route path="/workoutform" element={<WorkoutForm />} />
        <Route path="/workoutlist" element={<WorkoutList workouts={workoutList} />} />
      </Routes>
    </Router>
  );
};

export default App;