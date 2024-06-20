import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import WorkoutForm from './pages/WorkoutForm';
import WorkoutList from '../src/components/WorkoutList';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Loginsignup from './pages/signuplogin/SignUpLogin';
import LoginForm from './pages/loginform/LoginForm';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  const workouts = useSelector((state) => state.formData);
  console.log(workouts);

  const defaultWorkouts = [
    { id: 1, name: 'Pushups', duration: 10 },
    { id: 2, name: 'Squats', duration: 15 },
    { id: 3, name: 'Lunges', duration: 20 },
  ];

  const workoutList = workouts? workouts : defaultWorkouts;

  return (
    <Router>
      <Navbar />
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/workoutform" element={<WorkoutForm />} />
        <Route path="/workoutlist" element={<WorkoutList workouts={workoutList} />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="loginsignup" element={<Loginsignup />} />
      </Routes>
    </Router>
  );
};

export default App;