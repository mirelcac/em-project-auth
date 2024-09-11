import { UserModel } from "./model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h' // Make sure token expires in 24 hours
    });
};

// Password validation function
const isValidPassword = (password) => {
    const hasNumber = /[0-9]/.test(password);
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialSign = /[!@#$%^&*]/.test(password);
    return hasNumber && hasCapitalLetter && hasSpecialSign && password.length >= 6;
};

// FUNCTION FOR USER REGISTRATION
export const registerUserController = asyncHandler(async (req, res) => {
    // Extract email, username & password from the request body
    const { username, password, email } = req.body;

    try {
        // Check whether all fields of registration are inputted
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        // Check if password meets criteria
        if (!isValidPassword(password)) {
            return res.status(400).json({ success: false, message: "Password must contain at least one number, one capital letter, and one special character, and be at least 6 characters long." });
        }

        // Check if the username or email already exists in the database
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400);
            throw new Error(`User with ${existingUser.username === username ? "username" : "email"} already exists`);
        }

        // Generate a salt and hash the user's password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create a new user instance with the hashed password
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save(); // Save the new user instance to the database

        // Generate a JWT token for the new user
        const token = generateToken(newUser._id);

        // Respond with a success message, user details, and the token
        res.status(201).json({
            success: true,
            response: {
                username: newUser.username,
                email: newUser.email,
                id: newUser._id,
                token
            }
        });
    } catch (e) {
        if (e.name === 'ValidationError') {
            // Handle Mongoose validation errors
            return res.status(400).json({ success: false, message: e.message });
        }
        // Handle other types of errors
        res.status(500).json({ success: false, response: e.message });
    }
});


// FUNCTION FOR USER LOGIN
export const loginUserController = asyncHandler(async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    try {
        // Find a user with the provided username in the database
        const user = await UserModel.findOne({ username });
        if (!user) {
            // If no user is found with the provided username, respond with a 401 Unauthorized and a user not found message
            return res
                .status(401)
                .json({ success: false, response: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the provided password doesn't match the stored password, respond with a 401 Unauthorized and an incorrect password message
            return res
                .status(401)
                .json({ success: false, response: "Incorrect password" });
        }
        // Generate a JWT token for the user
        const token = generateToken(user._id);

        // Respond with a success message, user details, and the token
        res.status(200).json({
            success: true,
            response: {
                username: user.username,
                id: user._id,
                token //  token for the user using the acessToken generated from the model, // Use the generated token here
            },
        });
    } catch (e) {
        // Handle any errors that occur during the login process
        res.status(500).json({ success: false, response: e.message });
    }
});

