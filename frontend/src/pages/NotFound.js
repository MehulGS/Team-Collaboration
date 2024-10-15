// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white text-primary">
            <div className="text-center">
                <h1 className="text-4xl text-sky-800 mb-4">404 - Page Not Found</h1>
                <Link to="/" className="p-2 bg-black hover:bg-white hover:text-black text-primary rounded">Go Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
