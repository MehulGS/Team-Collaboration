// src/components/Tasks/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ task, onSave }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { title, description };

        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            await axios.post('http://localhost:5000/api/tasks', data, {
                headers: { Authorization: `Bearer ${token}` } // Include token in headers
            });
            onSave(); // Call the onSave callback after successful save
        } catch (error) {
            console.error('Error creating task:', error); // Log any errors
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-md">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
            ></textarea>
            <button type="submit" className="w-full p-2 bg-black hover:bg-white hover:text-black text-primary rounded">Save Task</button>
        </form>
    );
};

export default TaskForm;