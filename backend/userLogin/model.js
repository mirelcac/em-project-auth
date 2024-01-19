import mongoose from "mongoose";
import validator from 'validator';

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
    {
        // Define the 'username' field with a String data type
        username: {
            type: String, // Specifies that 'username' should be a string
            required: true, // Indicates that 'username' is a required field
            minlength: 5, // Sets a minimum length
            unique: true, // Make sure the username is unique in the database
        },
        email: {
            type: String,
            minlength: 4,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'Invalid email address']
        },
        // Define the 'password' field with a String data type
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
);


// Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
export const UserModel = mongoose.model("User", userSchema);


