import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/workoutform">Workout Form</Link>
            </li>
            <li>
              <Link to="/workoutlist">Workout List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to the Workout Tracker App!</h1>} />
          <Route path="/workoutform" element={<WorkoutForm />} />
          <Route path="/workoutlist" element={<WorkoutList workouts={workoutList} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;