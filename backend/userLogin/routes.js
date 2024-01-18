// Import the necessary modules and functions
import express from "express";
import { authenticateUser } from "./middleware";
import {
    registerUserController,
    loginUserController,
} from "./controller"; // Import controller functions for user registration and login

// Create an instance of the Express router
const router = express.Router();

// REGISTER ROUTE: Handle user registration
router.post("/register", registerUserController); // When a POST request is made to /register, execute the registerUserController function

// LOGIN ROUTE: Handle user login
router.post("/login", loginUserController); // When a POST request is made to /login, execute the loginUserController function

// AUTHENTICATED USER ROUTE: Display a secret message
router.get('/userpage', authenticateUser, (req, res) => {
    // Send a secret message to the authenticated user
    res.json({
        success: true,
        secretMessage: "This is a secret message only for authenticated users!"
    });
});

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.
