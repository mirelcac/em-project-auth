// Importing necessary libraries and modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Load and parse environment variables from the .env file
import userRoutes from "./userLogin/routes";

// Import database connection functions
import { connectDB } from "./db";

// Retrieve the port number from environment variables or set default
const port = process.env.PORT || 3000;

// Create an Express application instance
const app = express();

// Middlewares setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registering API routes with the Express application
app.use('/', userRoutes);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connecting to Mongo DB Atlas Instance
connectDB(); // Connects to MongoDB Atlas

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



