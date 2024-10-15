// src/components/Dashboard/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current user's tasks
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const res = await axios.get('http://localhost:5000/api/tasks/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(res.data);
            } catch (err) {
                console.error(err); // Log error to console
                setError('Error fetching tasks'); // Set user-friendly error message
            } finally {
                setLoading(false); // Set loading to false in both success and error cases
            }
        };

        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        localStorage.removeItem('user'); // Optionally remove user data
        navigate('/login'); // Redirect to login page
    };

    // Render loading, error, or tasks
    return (
        <div className="p-4 text-white bg-white h-screen">
            <header className="flex justify-between items-center bg-gray-900 p-4 mb-4 rounded">
                <h1 className="text-xl font-bold">My Application</h1>
                <nav>
                    <ul className="flex space-x-4">

                        <li>
                            <button onClick={() => navigate('/admin')} className="text-sky-800 hover:text-gray-400">Admin Dashboard</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/dashboard')} className="text-sky-800 hover:text-gray-400">User Dashboard</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/chat')} className="text-sky-800 hover:text-gray-400">Chat</button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-sky-800 hover:text-gray-400">Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <h2 className="text-2xl font-bold mb-4 text-sky-800">User Dashboard</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-sky-800">My Tasks</h3>
                    <ul>
                        {tasks.map(task => (
                            <li key={task._id} className="mb-2">
                                <strong>{task.title}</strong> - {task.status} - Priority: {task.priority}
                                <p>{task.description}</p>
                                <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
