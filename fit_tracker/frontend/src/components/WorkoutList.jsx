import React from 'react';
import { useDispatch } from 'react-redux';
// import { deleteWorkout } from '../redux/reducers/workoutSlice';

const WorkoutList = ({ workouts }) => {
  const dispatch = useDispatch();

  // const handleDelete = (id) => {
  //   dispatch(deleteWorkout(id));
  // };

  return (
    <div>
      <h2>Workout List</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>{workout.exercise}</strong> - Duration: {workout.duration} minutes
            {/* <button onClick={() => handleDelete(workout.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;