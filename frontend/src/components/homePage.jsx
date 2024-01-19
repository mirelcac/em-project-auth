import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './authStore';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    const { login, error } = useAuthStore();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation for empty fields
        if (!credentials.username || !credentials.password) {
            setLocalError('Please fill in all fields');
            return;
        }

        try {
            await login(credentials.username, credentials.password);
            if (!error) {
                navigate('/userpage');
            } else {
                // Handle errors from the authStore (server-side)
                setLocalError(error);
            }
        } catch (err) {
            // Catch any unexpected errors and display a general message
            setLocalError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Welcome to My App</h1>
            <p>This is the home page of the app.</p>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {localError && <p style={{ color: 'red' }}>{localError}</p>}
            <br />
            <Link to="/register">Register</Link> {/* Link to the registration page */}
        </div>
    );
};
