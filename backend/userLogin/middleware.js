
import jwt from 'jsonwebtoken';
import { UserModel } from './model';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Token is not valid' });
        }

        if (user.role !== 'user') {
            return res.status(403).json({ success: false, message: 'Access denied: requires user role' });
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};
