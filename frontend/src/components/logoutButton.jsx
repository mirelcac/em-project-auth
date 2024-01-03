import { useHistory } from 'react-router-dom';
import { useAuthStore } from './authStore';

export const LogoutButton = () => {
    const history = useHistory();  // Initialize useHistory

    const logout = useAuthStore((state) => state.logout);


    const handleLogout = () => {
        logout();
        // Redirect to login form after signing out
        history.push('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};
