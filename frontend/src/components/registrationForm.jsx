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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // If the form is valid, perform form submission logic
            console.log('Form submitted:', { name, email, password });
        } else {
            // If the form is not valid, log a message indicating validation failure
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