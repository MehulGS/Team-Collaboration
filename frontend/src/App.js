import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './screen/Login';
import Register from './screen/Register';
import Dashboard from './screen/Dashboard';
import UserManager from './screen/UserManager';
import TaskManager from './screen/TaskManager';
import TaskChatRoom from './screen/TaskChatRoom';
import Navbar from './Components/Navbar';

const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    // If there's a token, consider the user as logged in.
    if (token) {
      setUser({ token });
    }
  }, [token]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* If user is already logged in, redirect to dashboard */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/user-manager" element={user ? <UserManager /> : <Navigate to="/" />} />
        <Route path="/task-manager" element={user ? <TaskManager /> : <Navigate to="/" />} />
        <Route path="/task-chat/:taskId" element={user ? <TaskChatRoom /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
