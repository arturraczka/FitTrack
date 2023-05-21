import React from 'react';
import { useSelector } from 'react-redux';
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
    <div>
      <h1>My Workouts</h1>
      <WorkoutList workouts={workoutList} />
    </div>
  );
};

export default App;