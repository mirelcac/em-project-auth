import { useNavigate } from 'react-router-dom';
import useAuthStore from './authStore';
import styles from './userPage.module.css'


export const UserPage = () => {
    const { user, clearToken } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken(); // Clear the token and user info
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>User Page</h1>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>This is a page that only registered users can see!</p>
                    <button className={styles.link} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

