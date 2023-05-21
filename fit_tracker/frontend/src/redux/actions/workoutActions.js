import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActivity = createAsyncThunk(
  'workouts/fetchActivity',
  async (activityType) => {
    const response = await fetch(`/api/workouts/${activityType}`);
    if (!response.ok) {
      throw new Error('Failed to fetch activity data');
    }
    const data = await response.json();
    return data;
  }
);

export const postActivity = createAsyncThunk(
  'workouts/postActivity',
  async (activity) => {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });
    if (!response.ok) {
      throw new Error('Failed to post activity data');
    }
    const data = await response.json();
    return data;
  }
);