import { Router, Request, Response } from "express";
import User from "../models/user.model";
import { authMiddleware } from "../configs/middleware.config";
import roleRequire from "../configs/middleware.config";
import authenticate, { decode, generateToken } from '../services/auth.service';
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

router.get('/user-info', authMiddleware, async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = await decode(token);
  const userId = decoded.id;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

router.put('/update-user', authMiddleware, async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = await decode(token);
  const userId = decoded.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  res.status(200).json(updatedUser);
});
export default router;