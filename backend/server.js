import express from 'express';
import cors from 'cors'; // Security mechanism - defines how web pages in one domain interact with resources from another domain
import mongoose from 'mongoose';
import crypto from 'crypto';

// CONNECT TO DATABASE
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/auth';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8081;
const app = express();


// CREATE MONGOOSE MODEL //
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
    res.status(401).json({ error: 'Unauthorized access. Please log in.' });
  }
}

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// DEFINING ROUTES //
// Endpoint (edit later)
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
    res.status(400).json({ message: 'Error creating user. Please check your input and try again.', errors: err.errors }) // Handle errors during user creation
  }
})

// (!) authenticateUser - Ensures that the '/secrets' endpoint is accessible only to authenticated users by utilizing the authenticateUser middleware.
// Endpoint Secret message 
app.get('/secrets', authenticateUser, (req, res) => {
  res.json({ secret: 'Secret message!' });
});

// Endpoint for user authentication (to find the user)
app.post('/sessions', async (req, res) => {
  // Find a user in the database with the provided email
  const user = await User.findOne({ email: req.body.email });
  // Check if a user is found and if the provided password matches the stored hashed password
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken }); // Respond with the user's ID and access token if authentication is successful
  } else {
    res.status(401).json({ error: 'Invalid email or password. Please try again.' }); // Respond with a JSON indicating that the user was not found
  }
});



// START THE SERVER //
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
