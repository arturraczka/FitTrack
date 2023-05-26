import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const HeartAnimation = ({ steps, activeTime, caloriesBurnt, goal }) => {
  const [stepsCount, setStepsCount] = useState(0);
  const [activeTimeCount, setActiveTimeCount] = useState(0);
  const [caloriesBurntCount, setCaloriesBurntCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStepsCount(steps);
    setActiveTimeCount(activeTime);
    setCaloriesBurntCount(caloriesBurnt);
    setProgress((steps / goal) * 100);
  }, [steps, activeTime, caloriesBurnt, goal]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500 opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-500 opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-red-500 opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-red-500">
            <div className="flex flex-col items-center justify-center h-full">
              <CountUp end={stepsCount} duration={2} />
              <span className="text-sm font-medium text-gray-500">Steps</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-blue-500">
            <div className="flex flex-col items-center justify-center h-full">
              <CountUp end={activeTimeCount} duration={2} />
              <span className="text-sm font-medium text-gray-500">Active Time</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-green-500">
            <div className="flex flex-col items-center justify-center h-full">
              <CountUp end={caloriesBurntCount} duration={2} />
              <span className="text-sm font-medium text-gray-500">Calories Burnt</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-red-500">
            <path
              fill="currentColor"
              d="M12,21.35l-1.45-1.32C5.53,15.05,2,12.08,2,8.5A6.5,6.5,0,0,1,8.5,2a6.38,6.38,0,0,1,4.24,1.6A6.38,6.38,0,0,1,19.5,2a6.5,6.5,0,0,1,6.5,6.5c0,3.58-3.53,6.55-8.55,11.53L12,21.35Z"
              style={{ strokeDasharray: `${progress} 100` }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeartAnimation;