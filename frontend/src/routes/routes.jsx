import { Routes, Route } from "react-router-dom";
import { HomePage } from '../components/homePage';
import { RegisterPage } from '../components/registerPage';
import { UserPage } from '../components/userPage';
import { ProtectedRoute } from './protectRoute';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/userpage" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
        </Routes>
    );
};
