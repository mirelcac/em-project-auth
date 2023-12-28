import { useState } from 'react';

export const RegistrationForm = () => {
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
                // Make a POST request 
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
                // Parse the JSON response
                const data = await response.json();
                console.log('Form submitted successfully:', data);
            } catch (error) {
                console.error('Error submitting form:', error.message);
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