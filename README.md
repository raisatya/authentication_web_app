# MERN Stack Authentication Web Application

This is a custom authentication web application built with the MERN stack (MongoDB, Express, React with Vite, Node.js). Authentication is achieved using JSON Web Tokens (JWT) and cookies managed by the `cookie-parser` library.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Built With](#built-with)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install backend dependencies:

    ```bash
    cd backend
    npm install

3. Install frontend dependencies:

    ```bash
    cd ../frontend
    npm install

### Environment Variables

    Create your own .env files in the backend and frontend directories with the following variables:

    Backend (backend/.env)

    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    NODE_ENV=development
    ORIGIN_1=your-production-link-or-localhost:3000

    Frontend (frontend/.env)

    VITE_ENV=development
    VITE_API_URL=your-backend-url-or-localhost:3000

### Running the Application
    
    Start the backend server:

    cd backend
    npm run dev

    Start the frontend server:

    cd ../frontend
    npm run dev

    Open your browser and navigate to http://localhost:3000 to see the application in action

### Built With

    - MongoDB
    - Express
    - React (with Vite)
    - Node.js
    - JSON Web Tokens
    - cookie-parser
    - axios
    - tailwindcss
    - typescript

### License

    This project is licensed under the MIT License - see the LICENSE file for details.

    
    Make sure to replace `https://github.com/your-username/your-repo-name.git` with the actual URL of your repository. Additionally, update any other placeholder information with actual details specific to your project.
