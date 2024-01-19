import { useNavigate } from 'react-router-dom';
import useAuthStore from './authStore'; // Path to your authStore

export const UserPage = () => {
    const { user, clearToken } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken(); // Clear the token and user info
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div>
            <h1>User Page</h1>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>This is a page that only registered users can see!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

