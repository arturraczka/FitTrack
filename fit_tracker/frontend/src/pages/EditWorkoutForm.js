import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkout } from './workoutSlice';

const EditWorkoutForm = ({ workout }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(workout);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateWorkout(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Session Type:
        <input
          type="text"
          name="sessionType"
          value={formData.sessionType}
          onChange={handleChange}
        />
      </label>
      <label>
        Distance:
        <input
          type="number"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
        />
      </label>
      <label>
        Intensity:
        <input
          type="text"
          name="intensity"
          value={formData.intensity}
          onChange={handleChange}
        />
      </label>
      <label>
        Length:
        <input
          type="number"
          name="length"
          value={formData.length}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditWorkoutForm;