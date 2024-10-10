import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';

interface AuthenticatedRequest extends Request {
    userId?: string;
    userRole?: string[];
}

const authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.replace(/^Bearer\s/, '');
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        try {
            const { userId, role } = await verifyToken(token);
            if (!userId) {
                return res.status(401).json({ message: 'Invalid userId' });
            }

            req.userId = userId;
            req.userRole = role;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default authenticate;