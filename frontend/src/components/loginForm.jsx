import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from './authStore';

export const LoginForm = () => {
    const history = useHistory(); // Initialize useHistory

    const { setUser } = useAuthStore();

    // State variables for form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Function to validate form fields
    const validateForm = () => {
        const errors = {};
        // Check if any field is empty
        if (!email.trim() || !password.trim()) {
            errors.general = 'All fields are required';
        }
        setErrors(errors); // Update errors state
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Make a POST request for user login
                const response = await fetch('http://localhost:8081/sessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
                // Check if the login was successful
                if (!response.ok) {
                    throw new Error('Login failed. Please try again.');
                }
                // Parse the JSON response
                const data = await response.json();

                //NB DELETE LATER //
                console.log('API Response:', data);

                const { userId, accessToken, name, email } = data;

                setUser({ id: userId, name, email }, accessToken);
                console.log('Login successful:', data);
                // Handle successful login (update global state, redirect, etc.)

                history.push('/secrets');  // // Redirect to /secrets after successful login)

            } catch (error) {
                console.error('Error during login:', error.message);
                setErrors({ general: 'Login failed. Please try again.' });

                // Handle login error (display error message, etc.)
            }
        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                {/* Display a general error message */}
                {errors.general && <p>{errors.general}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
