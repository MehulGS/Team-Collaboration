// src/components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = response.data; // Extract token and user data

            // Save token and user data to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // Save the entire user object

            // Redirect based on user role
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please check your credentials and try again.'); // Set error message
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white text-primary">
            <form onSubmit={handleLogin} className="w-96 p-6 bg-gray-800 rounded-md">
                <h2 className="text-2xl mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error messages */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 bg-gray-700 rounded"
                    required // Make the field required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 bg-gray-700 rounded"
                    required // Make the field required
                />
                <button type="submit" className="w-full p-2 bg-black hover:bg-white hover:text-black text-primary rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
