// src/components/Dashboard/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../Tasks/TaskForm'; // Adjust the import based on your folder structure
import TaskList from '../Tasks/TaskList'; // Adjust the import based on your folder structure
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isTaskFormVisible, setTaskFormVisible] = useState(false); // State to toggle TaskForm visibility
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Fetch all users for the admin
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const res = await axios.get('http://localhost:5000/api/auth/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
            } catch (err) {
                console.error('Error fetching users:', err); // Log the error for debugging
                setError('Error fetching users: ' + (err.response?.data.message || err.message));
            } finally {
                setLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/auth/assign-role/${userId}`, { role: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Role updated successfully');
            setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        } catch (err) {
            console.error('Error updating role:', err); // Log the error for debugging
            alert('Error updating role: ' + (err.response?.data.message || err.message));
        }
    };

    const handleSaveTask = () => {
        setTaskFormVisible(false); // Hide the form after saving
        // Fetch tasks again or update the state if necessary
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="p-4 text-sky-800 bg-white h-screen">
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

            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <button 
                onClick={() => setTaskFormVisible(!isTaskFormVisible)} 
                className="mb-4 p-2 bg-green-600 hover:bg-green-500 rounded">
                {isTaskFormVisible ? 'Hide Task Form' : 'Add Task'}
            </button>
            {isTaskFormVisible && <TaskForm onSave={handleSaveTask} />} {/* Show TaskForm based on state */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Users</h3>
                {loading ? (
                    <div className="text-sky-800">Loading...</div> 
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : users.length === 0 ? (
                    <p>No users available</p>
                ) : (
                    <ul>
                        {users.map(user => (
                            <li key={user._id} className="mb-2">
                                {user.name} - {user.email} - Role: {user.role}
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="ml-2 bg-gray-800 text-sky-800 border border-gray-600"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <TaskList /> {/* Display TaskList here if needed */}
        </div>
    );
};

export default AdminDashboard;
