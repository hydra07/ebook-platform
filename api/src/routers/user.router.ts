import { Router, Request, Response } from "express";
import User from "../models/user.model";
import { authMiddleware } from "../configs/middleware.config";
import roleRequire from "../configs/middleware.config";
import authenticate, { decode, generateToken } from '../services/auth.service';
const router = Router();
router.get("/:id", await roleRequire, async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Use req.userId from the roleRequire middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Error fetching user profile" });
  }
});

router.put(
  "/:id",
  authMiddleware,
  roleRequire(["user"]),
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId; // Use req.userId from the roleRequire middleware
      const { username, image } = req.body;

      const updateData = { username, image };

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });

      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ error: "Error updating user profile" });
    }
  }
);

export default router;