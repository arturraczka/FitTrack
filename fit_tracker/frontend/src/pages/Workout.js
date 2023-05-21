import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '.redux/workoutSlice';

const RunningActivity = () => {
  const dispatch = useDispatch();
  const { formData, isLoading } = useSelector((state) => state.formData);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Running Activity</h2>
      <ul>
        {formData.map((activity) => (
          <li key={activity.id}>
            <p>Date: {activity.date}</p>
            <p>Distance: {activity.distance}</p>
            <p>Time: {activity.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RunningActivity;