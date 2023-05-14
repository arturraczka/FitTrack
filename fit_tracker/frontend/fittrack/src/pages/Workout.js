import React, { useState, useEffect } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import axios from 'axios';

const Workout = () => {
  const [workouts, setWorkouts] 