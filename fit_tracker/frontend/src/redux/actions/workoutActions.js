import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActivity = createAsyncThunk(
  'workouts/fetchActivity',
  async (activityType) => {
    const response = await fetch(`http://127.0.0.1:8000/my-activities/${activityType}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch activity data');
    }
    const data = await response.json();
    return data;
  }
);

export const postActivity = createAsyncThunk(
  'workouts/postActivity',
  async ({ activityType, activityData }) => {
    const response = await fetch(`http://127.0.0.1:8000/my-activities/${activityType}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });
    if (!response.ok) {
      throw new Error('Failed to post activity data');
    }
    const data = await response.json();
    return data;
  }
);