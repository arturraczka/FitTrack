import HeartAnimation from './HeartAnimation';

const WorkoutList = ({ workouts }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">{workout.name}</h2>
              <p className="text-sm text-gray-500">{workout.date}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500 mr-2">
                    <path
                      fill="currentColor"
                      d="M12,21.35l-1.45-1.32C5.53,15.05,2,12.08,2,8.5A6.5,6.5,0,0,1,8.5,2a6.38,6.38,0,0,1,4.24,1.6A6.38,6.38,0,0,1,19.5,2a6.5,6.5,0,0,1,6.5,6.5c0,3.58-3.53,6.55-8.55,11.53L12,21.35Z"
                    />
                  </svg>
                  <div className="text-sm text-gray-500">Steps</div>
                </div>
                <div className="text-sm text-red-500">{workout.steps}</div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500 mr-2">
                    <path
                      fill="currentColor"
                      d="M12,21.35l-1.45-1.32C5.53,15.05,2,12.08,2,8.5A6.5,6.5,0,0,1,8.5,2a6.38,6.38,0,0,1,4.24,1.6A6.38,6.38,0,0,1,19.5,2a6.5,6.5,0,0,1,6.5,6.5c0,3.58-3.53,6.55-8.55,11.53L12,21.35Z"
                    />
                  </svg>
                  <div className="text-sm text-gray-500">Active Time</div>
                </div>
                <div className="text-sm text-blue-500">{workout.activeTime} minutes</div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500 mr-2">
                    <path
                      fill="currentColor"
                      d="M12,21.35l-1.45-1.32C5.53,15.05,2,12.08,2,8.5A6.5,6.5,0,0,1,8.5,2a6.38,6.38,0,0,1,4.24,1.6A6.38,6.38,0,0,1,19.5,2a6.5,6.5,0,0,1,6.5,6.5c0,3.58-3.53,6.55-8.55,11.53L12,21.35Z"
                    />
                  </svg>
                  <div className="text-sm text-gray-500">Calories Burnt</div>
                </div>
                <div className="text-sm text-green-500">{workout.caloriesBurnt}</div>
              </div>
            </div>
            <div className="p-4">
              <HeartAnimation steps={workout.steps} activeTime={workout.activeTime} caloriesBurnt={workout.caloriesBurnt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;