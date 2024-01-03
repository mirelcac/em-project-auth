import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from './authStore';

export const RegistrationForm = () => {

    const history = useHistory();  // Initialize useHistory

    // State variables for form inputs and errors
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Function to validate form fields
    const validateForm = () => {
        const errors = {};
        // Check if any field is empty
        if (!name.trim() || !email.trim() || !password.trim()) {
            errors.general = 'All fields are required';
        }
        setErrors(errors); // Update errors state
        return Object.keys(errors).length === 0;// Return true if no errors
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Make a POST request for user registration
                const response = await fetch('http://localhost:8081/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                });
                // Check if the registration was successful
                if (!response.ok) {
                    throw new Error('Registration failed. Please try again.');
                }
                // Parse the JSON response
                const data = await response.json();
                // Update user and authentication state on successful registration
                useAuthStore.setState({ user: data.user, accessToken: data.accessToken, isAuthenticated: true });
                console.log('Form submitted successfully:', data);
                // Handle successful registration

                history.push('/login');
                // Redirect to /login after successful registration

            } catch (error) {
                console.error('Error submitting form:', error.message);
                setErrors({ general: 'Registration failed. Please try again.' });
                // Handle registration error (display error message, etc.)
            }
        } else {
            console.log('Form validation failed');
        }
    };


    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};