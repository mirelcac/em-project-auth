import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from './authStore';
import styles from './registerPage.module.css'


// User registration
export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, error } = useAuthStore();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Simple client-side validation
        if (!formData.username || !formData.email || !formData.password) {
            setLocalError('Please fill in all fields');
            return;
        }

        try {
            await register(formData.username, formData.password, formData.email);
            if (!error) {
                setRegistrationSuccess(true);
                setTimeout(() => navigate('/'), 3000); // Redirect to login after 3 seconds
            } else {
                setLocalError(error);
            }
        } catch (err) {
            setLocalError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>Register</h1>
            {!registrationSuccess ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    <button type="submit">Register</button>
                    {localError && <p style={{ color: 'red' }}>{localError}</p>}
                </form>
            ) : (
                <p>Registration successful! Redirecting to login...</p>
            )}
            <br />
            <Link className={styles.link} to="/">Back to Home</Link>
        </div>
    );
};