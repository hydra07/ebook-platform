import { Router, Request, Response } from 'express';
import User from '../models/user.model';
import { authMiddleware } from '../configs/middleware.config';
import roleRequire from '../configs/middleware.config';

const router = Router();

router.put('/:id', authMiddleware), async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ error: 'Error updating user profile' });
    }
};

export default router;