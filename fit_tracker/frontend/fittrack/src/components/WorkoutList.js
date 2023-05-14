import React from 'react';

const WorkoutList = ({ workouts }) => {
  return (
    <div>
      <h2>Workout List</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>{workout.exercise}</strong> - Duration: {workout.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
