import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { postServices } from '../redux/reducers/workoutSlice';

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({ exercise: '', duration: 0 });
  const [sessionType, setSessionType] = useState('');
  const [distance, setDistance] = useState('');
  const [intensity, setIntensity] = useState('');
  const [lengthTime, setLengthTime] = useState('');
  const [startDate, setStartDate] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 

  const isLoading = useSelector((state) => state.isLoading);


  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate); // update startDate variable with selected date
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postServices({
      selectedDate: startDate,
      data:
       {
         sessionType, distance, intensity, lengthTime,
       },
    }));
    // Reset the form after submission
    setSessionType('');
    setDistance('');
    setIntensity('');
    setLengthTime('');
    setStartDate('');

    navigate('/AddReservationForm'); // redirect to home page after form submission
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
            <option value="running">Running</option>
            <option value="walking">Walking</option>
            <option value="cycling">Cycling</option>
            <option value="swimming">Swimming</option>
            <option value="hiking">Hiking</option>
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
            <select
              id="intensity"
              className="form-select block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
            >
              <option value="">Select Intensity</option>
              {/* Add your dropdown options here */}
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="lengthTime" className="block mb-2 text-sm font-medium text-gray-700">
            Length (Time)
            <input
            type="number"
            id="lengthTime"
            className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={lengthTime}
            onChange={(e) => setLengthTime(e.target.value)}
          />
          </label>
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
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;