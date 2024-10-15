// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Chat from './components/Chat/ChatComponent'
import NotFound from './pages/NotFound';
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="bg-background text-primary min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/chat" element={<Chat />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
