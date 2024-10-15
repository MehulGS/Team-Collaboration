# Team-Collobration-Hub

An Team collobration System built with React.js for the frontend, and Node.js, Express, and MongoDB for the backend.



## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Features

- User authentication and authorization
- Manage task, user
- add task
- Dashboard with list user and task
- communicat user with their perticuler task with socket.io

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   ```

## Running the Application

1. **Run Backend:**
   ```bash
   cd Backend
   npm start
   ```

2. **Run Frontend:**
   ```bash
   cd ../Frontend
   npm start
   ```

## Environment Variables

Create a `.env` file in the Backend and Frontend directories and configure the following:

### Backend `.env`:
```env
MONGODB_URI = db url
PORT = 5000
JWT_SECRET = secret
CORS_ORIGIN = http://localhost:3000
```


