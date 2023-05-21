import React from 'react';

const WorkoutList = ({ workouts }) => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold mb-4">Workout List</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-white shadow overflow-hidden sm:rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold">{workout.name}</h2>
                  <span className="text-gray-500">{workout.duration} min</span>
                </div>
                <p className="text-gray-500">{workout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutList;