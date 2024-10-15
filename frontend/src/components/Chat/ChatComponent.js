// src/components/Chat/Chat.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        socket.on('chatMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chatMessage', { message });
            setMessage('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="p-4 text-white">
            <header className="flex justify-between items-center bg-gray-900 p-4 mb-4 rounded">
                <h1 className="text-xl font-bold">Chat Room</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <button onClick={() => navigate('/admin')} className="text-white hover:text-gray-400">Admin Dashboard</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/dashboard')} className="text-white hover:text-gray-400">User Dashboard</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/chat')} className="text-white hover:text-gray-400">Chat</button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-white hover:text-gray-400">Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="p-4 bg-gray-700 rounded">
                <div className="mb-4 h-64 overflow-y-auto bg-gray-800 p-2 rounded">
                    {messages.map((msg, index) => (
                        <p key={index} className="p-1">
                            {msg.message}
                        </p>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow p-2 bg-gray-600 rounded"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 p-2 bg-black hover:bg-white hover:text-black text-primary rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
