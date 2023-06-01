const HeartAnimation = ({ steps, activeTime, caloriesBurnt }) => {
  const total = steps + activeTime + caloriesBurnt;
  const stepsPercentage = (steps / total) * 100;
  const activeTimePercentage = (activeTime / total) * 100;
  const caloriesBurntPercentage = (caloriesBurnt / total) * 100;

  return (
    <div className="relative w-full h-8">
      <div className="absolute inset-0 bg-gray-200 rounded-full">
        <div className="absolute inset-y-0 left-0 bg-red-500 rounded-full" style={{ width: `${stepsPercentage}%` }}></div>
        <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{ width: `${activeTimePercentage}%` }}></div>
        <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{ width: `${caloriesBurntPercentage}%` }}></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 20 20" fill="none" className="heart w-6 h-6 text-red-500">
          <path
            d="M10 18.928c-.265 0-.52-.104-.71-.293l-7.07-7.07c-1.562-1.562-1.562-4.095 0-5.657 1.562-1.562 4.095-1.562 5.657 0L10 6.343l1.414-1.414c1.562-1.562 4.095-1.562 5.657 0 1.562 1.562 1.562 4.095 0 5.657l-7.07 7.07c-.19.19-.445.293-.71.293z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeartAnimation;