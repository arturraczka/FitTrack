import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActivity } from './workoutSlice';

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sessionType: '',
    distance: '',
    intensity: '',
    length: '',
    date: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      dispatch(postActivity(formData));
      setFormData({
        sessionType: '',
        distance: '',
        intensity: '',
        length: '',
        date: '',
      });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.sessionType) {
      errors.sessionType = 'Session type is required';
    }
    if (!data.distance) {
      errors.distance = 'Distance is required';
    } else if (data.distance < 0) {
      errors.distance = 'Distance must be a positive number';
    }
    if (!data.intensity) {
      errors.intensity = 'Intensity is required';
    }
    if (!data.length) {
      errors.length = 'Length is required';
    } else if (data.length < 0) {
      errors.length = 'Length must be a positive number';
    }
    if (!data.date) {
      errors.date = 'Date is required';
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Session Type:
        <select name="sessionType" value={formData.sessionType} onChange={handleChange}>
          <option value="">Select Session Type</option>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
        </select>
        {errors.sessionType && <span>{errors.sessionType}</span>}
      </label>
      <label>
        Distance:
        <input type="number" name="distance" value={formData.distance} onChange={handleChange} />
        {errors.distance && <span>{errors.distance}</span>}
      </label>
      <label>
        Intensity:
        <select name="intensity" value={formData.intensity} onChange={handleChange}>
          <option value="">Select Intensity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.intensity && <span>{errors.intensity}</span>}
      </label>
      <label>
        Length:
        <input type="number" name="length" value={formData.length} onChange={handleChange} />
        {errors.length && <span>{errors.length}</span>}
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        {errors.date && <span>{errors.date}</span>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WorkoutForm;