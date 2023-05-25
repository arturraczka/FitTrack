import CountUp from 'react-countup';

const HeartAnimation = ({ steps, activeTime, caloriesBurnt }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-500 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-red-500 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-transparent border-4 border-red-500">
            <div className="flex flex-col items-center justify-center h-full">
              <CountUp end={steps} duration={2} />
              <span className="text-sm font-medium text-gray-500">Steps</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-transparent border-4 border-blue-500">
            <div className="flex flex-col items-center justify-center h-full">
              <CountUp end={activeTime} duration={2} />
              <span className="text-sm font-medium text-gray-500">Active Time</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-transparent border-4 border-green-500">
            <div className="flex flex-col items-center justify-center h-full">
              <CountUp end={caloriesBurnt} duration={2} />
              <span className="text-sm font-medium text-gray-500">Calories Burnt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default HeartAnimation;