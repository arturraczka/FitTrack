import React, { useState } from 'react';

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({ exercise: '', duration: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the workout to the backend or store in local storage
    console.log(workout);
  };

  return (
    <div>
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={workout.exercise}
          onChange={(e) => setWorkout({ ...workout, exercise: e.target.value })}
          placeholder="Exercise"
        />
        <input
          type="number"
          value={workout.duration}
          onChange={(e) => setWorkout({ ...workout, duration: e.target.value })}
          placeholder="Duration (minutes)"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
