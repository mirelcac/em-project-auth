import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto'; //Library to create access token
import bcrypt from 'bcrypt-nodejs'; //To hash our password

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/auth';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Create mogoose model:
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex') // Convert to hex desimal value to store in our database
  }
});

// MIDDLEWARE //
// Middleware for authenticating users based on access token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') });  // Find a user in the database using the access token
  if (user) {
    // If a user is found, set the user in the request object and proceed to the next middleware
    req.user = user;
    next();
  } else {
    // If no user is found, respond with a 401 Unauthorized status and a JSON indicating logout
    res.status(401).json({ loggedOut: true });
  }
}

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// DEFINING ROUTES //
// Endpoint 
app.get('/', (req, res) => {
  res.send('Hello Technigo!');
});

// Endpoint to create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body // Extract user details from request body 
    const user = new User({ name, email, password: bcrypt.hashSync(password) }); // Create a new user with hashed(!) password
    await user.save();     // Save the user to the database
    res.status(201).json({ id: user._id, accessToken: user.accessToken }) // Respond with user details and access token
  } catch (err) {
    res.status(400).json({ message: 'ERROR! Could not create user', errors: err.errors }) // Handle errors during user creation
  }
})

app.get('/secrets', (req, res) => {
  res.json({ secret: 'Secret message!' });
});

console.log(crypto.randomBytes(128).toString('hex'))

// START THE SERVER //
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

