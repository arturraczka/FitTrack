import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActivity } from '../redux/actions/workoutActions';

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sessionType: '',
    distance: '',
    intensity: '',
    length: '',
    date: '',
  });


  const handleSubmit = (event) => {
    event.preventDefault();

      const activityType = 'hiking'; // replace with actual activity type
      dispatch(postActivity({ activityType, activityData: formData }));
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="sessionType"
          >
            Session Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sessionType"
            type="text"
            name="sessionType"
            placeholder="Enter session type"
            value={formData.sessionType}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="distance"
          >
            Distance
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="distance"
            type="number"
            name="distance"
            placeholder="Enter distance"
            value={formData.distance}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="intensity"
          >
            Intensity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="intensity"
            type="text"
            name="intensity"
            placeholder="Enter intensity"
            value={formData.intensity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="length"
          >
            Length
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="length"
            type="number"
            name="length"
            placeholder="Enter length"
            value={formData.length}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            name="date"
            placeholder="Enter date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Activity
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;