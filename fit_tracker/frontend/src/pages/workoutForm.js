import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActivity } from '../redux/workoutSlice';

const WorkoutForm = ({ activityType }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(activityType)(formData));
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Distance:
        <input type="number" name="distance" value={formData.distance || ''} onChange={handleChange} />
      </label>
      <label>
        Duration:
        <input type="number" name="duration" value={formData.duration || ''} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WorkoutForm;