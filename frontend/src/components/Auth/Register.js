// src/components/Auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            navigate('/login');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white text-primary">
            <form onSubmit={handleRegister} className="w-96 p-6 bg-gray-800 rounded-md">
                <h2 className="text-2xl mb-4">Register</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 rounded" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 rounded" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 rounded" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 rounded">
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" className="w-full p-2 bg-black hover:bg-white hover:text-black text-primary rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
