import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null); // State to manage the editing task
    const [editedTitle, setEditedTitle] = useState(''); // State for edited title
    const [editedDescription, setEditedDescription] = useState(''); // State for edited description

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(`http://localhost:5000/api/tasks/user`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { status: filter },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            setError('Failed to fetch tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setError('');
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task', error);
            setError('Failed to delete task. Please try again.');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        setError('');
        try {
            await axios.put(`http://localhost:5000/api/tasks/status/${id}`, { status }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task status', error);
            setError('Failed to update task status. Please try again.');
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');
        try {
            await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, {
                title: editedTitle,
                description: editedDescription
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEditingTask(null); // Clear editing task
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task', error);
            setError('Failed to update task. Please try again.');
        }
    };

    return (
        <div className="p-4 bg-gray-800 rounded-md">
            {loading && <p className="text-white">Loading tasks...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <select onChange={(e) => setFilter(e.target.value)} className="w-full p-2 bg-gray-700 rounded">
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {editingTask ? (
                <form onSubmit={handleEditSubmit} className="mb-4">
                    <input 
                        type="text" 
                        value={editedTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)} 
                        className="p-2 mb-2 w-full bg-gray-700 rounded" 
                        placeholder="Task Title" 
                    />
                    <textarea 
                        value={editedDescription} 
                        onChange={(e) => setEditedDescription(e.target.value)} 
                        className="p-2 mb-2 w-full bg-gray-700 rounded" 
                        placeholder="Task Description"
                    />
                    <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded">Update Task</button>
                    <button type="button" onClick={() => setEditingTask(null)} className="ml-2 p-2 bg-gray-600 hover:bg-gray-500 text-white rounded">Cancel</button>
                </form>
            ) : (
                <ul className="list-none">
                    {tasks.map((task) => (
                        <li key={task._id} className="p-2 mb-2 bg-gray-700 rounded">
                            <h3 className="font-bold">{task.title}</h3>
                            <p>{task.description}</p>
                            <div className="flex justify-between items-center">
                                <button onClick={() => handleDelete(task._id)} className="mt-2 p-2 bg-red-600 hover:bg-red-500 text-white rounded">Delete</button>
                                <div>
                                    <button onClick={() => handleEditClick(task)} className="mt-2 p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded">Edit</button>
                                    <button onClick={() => handleStatusUpdate(task._id, 'Pending')} className="mt-2 p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded">Pending</button>
                                    <button onClick={() => handleStatusUpdate(task._id, 'In Progress')} className="mt-2 p-2 bg-blue-500 hover:bg-blue-400 text-white rounded">In Progress</button>
                                    <button onClick={() => handleStatusUpdate(task._id, 'Completed')} className="mt-2 p-2 bg-green-500 hover:bg-green-400 text-white rounded">Completed</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
