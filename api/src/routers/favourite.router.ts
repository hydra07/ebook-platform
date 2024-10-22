import { Router, Request, Response } from "express";
import Favourite from "../models/favourite.model";
import { authMiddleware } from "../configs/middleware.config";
import { decode } from "../services/auth.service";

const router = Router();

router.post("/:bookId", authMiddleware, async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = await decode(token);
        const userId = decoded.id;
        const { bookId } = req.params;

        const newFavourite = new Favourite({ userId, bookId });
        await newFavourite.save();

        return res.status(201).json(newFavourite);
    } catch (error) {
        console.error("Error adding favourite book:", error);
        return res.status(500).json({ error: "Error adding favourite book" });
    }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = await decode(token);
        const userId = decoded.id;

        const favourites = await Favourite.find({ userId })
            .populate({
                path: 'bookId',
                select: 'title bookUrl'
            });

        return res.status(200).json(favourites);
    } catch (error) {
        console.error("Error fetching favourite books:", error);
        return res.status(500).json({ error: "Error fetching favourite books" });
    }
});

router.delete("/:bookId", authMiddleware, async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = await decode(token);
        const userId = decoded.id;
        const { bookId } = req.params;

        const result = await Favourite.findOneAndDelete({ userId, bookId });

        if (!result) {
            return res.status(404).json({ message: "Favourite book not found" });
        }

        return res.status(200).json({ message: "Favourite book deleted successfully" });
    } catch (error) {
        console.error("Error deleting favourite book:", error);
        return res.status(500).json({ error: "Error deleting favourite book" });
    }
});
export default router;