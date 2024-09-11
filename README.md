# Project Auth API

# Overview

This project is a full-stack authentication system featuring user registration, login, and access to a protected "secret page" for authenticated users. It integrates both frontend and backend components to deliver a seamless user experience.

# Features

- User Registration: Allows new users to create an account.
- User Authentication: Enables users to log in with their credentials.
- Secret Page: Restricted to authenticated users only.

# Technologies

# Frontend
- React: A JavaScript library for building user interfaces. (React)
- React Router DOM: For routing and navigation in a React application. (React Router)
- Zustand: A small, fast state management solution for React. (Zustand)
- Vite: A build tool that provides a fast development environment. (Vite)
- ESLint: A tool for identifying and fixing problems in JavaScript code. (ESLint)
- Deployed with Netlify 

# Backend
- Express: A web application framework for Node.js. (Express)
- Node.js: A JavaScript runtime built on Chrome's V8 engine. (Node.js)
- MongoDB Atlas: Cloud database service for MongoDB. (MongoDB Atlas)
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js. (Mongoose)
- JSON Web Tokens (JWT): For handling authentication and authorization. (JWT)
- Environment Variables: Ensure that environment variables for database connection and other secrets are correctly configured in both the backend and frontend deployment platforms.
- Deployed on Render.

# Challenges

- Deployment Issues: Encountered difficulties with deploying both the frontend and backend. Initial challenges included configuring environment variables and ensuring correct integration between frontend and backend.
- Token Management: Faced issues with handling and validating tokens, which required adjustments to ensure secure user authentication.

# Key Takeaways

- Integration of Frontend and Backend: Gained experience in connecting a React frontend with an Express backend, including handling authentication and routing.
- Deployment Process: Learned about the deployment process using Netlify and Render, including managing environment variables and troubleshooting deployment issues.
- State Management: Improved understanding of state management with Zustand and how to efficiently manage application state in a React application.
- Database Configuration: Gained practical experience in setting up and configuring MongoDB Atlas with Mongoose for a production-ready database solution.

## View it live

Frontend on netlify: https://em-authorization.netlify.app/
Backend on render: https://em-authorization.onrender.com/
