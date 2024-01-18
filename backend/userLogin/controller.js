import { UserModel } from "./model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h' // Token expires in 24 hours
    });
};

// FUNCTION FOR USER REGISTRATION
export const registerUserController = asyncHandler(async (req, res) => {
    // Extract email, username and password from the request body
    const { username, password, email } = req.body;
    // In this try section of the try catch we will first do some conditional logic and then generate the newUser with a crypted password within the DB.
    try {
        // 1st Condition
        // Check wether all fields of registration logic are NOT [!email] inputted from the request.body object
        if (!username || !email || !password) {
            // if so, set http status to a 400code
            res.status(400);
            // and throw new error with some info
            throw new Error("Please add all fields");
        }
        // 2nd Condition
        // Check if the current user trying to register is using an usernam or email that matches with the same username or email in the database, so they would have to choose something diferent
        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            res.status(400);
            throw new Error(
                `User with ${existingUser.username === username ? "username" : "email"
                } already exists`
            );
        }

        // Generate a salt and hash the user's password
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = bcrypt.hashSync(password, salt);
        // Create a new user instance with the hashed password
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        // Description: Save the new user instance to the database
        await newUser.save();

        // Generate a JWT token for the new user
        const token = generateToken(newUser._id);

        // Respond with a success message, user details, and the token
        res.status(201).json({
            success: true,
            response: {
                username: newUser.username,
                email: newUser.email,
                id: newUser._id,
                token // Send the token to the user
            },
        });
    } catch (e) {
        // Handle any errors that occur during the registration process
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

