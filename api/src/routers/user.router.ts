import { Router, Request, Response } from "express";
import User from "../models/user.model";
import { authMiddleware } from "../configs/middleware.config";
import roleRequire from "../configs/middleware.config";
import authenticate, { decode, generateToken } from '../services/auth.service';
import upgradeUserToPremium from "../services/user.service";
const router = Router();
router.put('/upgrade-premium', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 'premiumStatus.isPremium': true },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;