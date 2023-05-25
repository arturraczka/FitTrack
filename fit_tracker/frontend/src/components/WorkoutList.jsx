import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import HeartAnimation from './HeartAnimation';


const WorkoutList = ({ workouts }) => {
  const totalSteps = workouts.reduce((acc, workout) => acc + workout.steps, 0);
  const totalActiveTime = workouts.reduce((acc, workout) => acc + workout.activeTime, 0);
  const totalCaloriesBurnt = workouts.reduce((acc, workout) => acc + workout.caloriesBurnt, 0);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">{workout.name}</h2>
              <p className="text-sm text-gray-500">{workout.date}</p>
              <p className="text-sm text-gray-500">{workout.duration} minutes</p>
              <p className="text-sm text-gray-500">{workout.steps} steps</p>
              <p className="text-sm text-gray-500">{workout.activeTime} minutes active</p>
              <p className="text-sm text-gray-500">{workout.caloriesBurnt} calories burnt</p>
            </div>
            <div className="p-4">
              <HeartAnimation steps={workout.steps} activeTime={workout.activeTime} caloriesBurnt={workout.caloriesBurnt} />
            </div>
          </div>
        ))}
      </div>
      <Link to="/workoutform" className="inline-block mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        Add Workout
      </Link>
    </div>
  );
};

export default WorkoutList;