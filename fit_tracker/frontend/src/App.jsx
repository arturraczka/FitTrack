import React from 'react';
import { useSelector } from 'react-redux';
import WorkoutList from './WorkoutList';

const App = () => {
  const workouts = useSelector((state) => state.workouts);

  return (
    <div>
      <h1>My Workouts</h1>
      <WorkoutList workouts={workouts} />
    </div>
  );
};

export default App;