import { Navigate } from 'react-router-dom';
import useAuthStore from '../components/authStore';

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuthStore();

    // Check if there's a token, if not, redirect to the login page
    if (!token) {
        return <Navigate to="/" />;
    }

    // If there is a token, render the children (protected component)
    return children;
};

