import React, { useState } from 'react';

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({ exercise: '', duration: 0 });
  const [sessionType, setSessionType] = useState('');
  const [distance, setDistance] = useState('');
  const [intensity, setIntensity] = useState('');
  const [lengthTime, setLengthTime] = useState('');
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Activity Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sessionType" className="block mb-2 text-sm font-medium text-gray-700">
            Session Type
          </label>
          <select
            id="sessionType"
            className="form-select block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
          >
            <option value="">Select Session Type</option>
            {/* Add your dropdown options here */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="distance" className="block mb-2 text-sm font-medium text-gray-700">
            Distance
          </label>
          <input
            type="number"
            id="distance"
            className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="intensity" className="block mb-2 text-sm font-medium text-gray-700">
            Intensity
          </label>
          <select
            id="intensity"
            className="form-select block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          >
            <option value="">Select Intensity</option>
            {/* Add your dropdown options here */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="lengthTime" className="block mb-2 text-sm font-medium text-gray-700">
            Length (Time)
          </label>
          <input
            type="number"
            id="lengthTime"
            className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={lengthTime}
            onChange={(e) => setLengthTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="datepicker-container">
            <label htmlFor="datepicker" className="block font-medium mb-2">
              Select Date:
            </label>
            <DatePicker id="datepicker" value={startDate} onChange={handleDateChange} render={<InputIcon />} />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
