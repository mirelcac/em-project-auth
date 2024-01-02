import useAuthStore from './authStore';

export const LogoutButton = () => {
    const logout = useAuthStore((state) => state.logout);


    const handleLogout = () => {
        logout();
        // Redirect to login form after signing out
        window.location.href = '/login';
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};
