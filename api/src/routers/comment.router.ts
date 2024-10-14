import { Router, Request, Response } from 'express';
import Comment from '../models/comment.model';
import Book from '../models/book.model';
import { authMiddleware } from '../configs/middleware.config';

const commentRouter = Router({ mergeParams: true });

// GET comments for a specific book
commentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const comments = await Comment.find({ bookId }).populate('userId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments' });
    }
});

// POST create a new comment
commentRouter.post('/user/:userId', async (req: Request, res: Response) => {
    try {
        const { bookId, userId } = req.params;
        const { text } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'UserId is required' });
        }

        const newComment = new Comment({
            userId,
            bookId,
            text,
        });

        const savedComment = await newComment.save();

        // Update the book's comments array
        await Book.findByIdAndUpdate(bookId, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
});
// POST reply to a comment
// commentRouter.post('/:commentId/user/:userId', authMiddleware, async (req: Request, res: Response) => {
//     try {
//         const { bookId, commentId, userId } = req.params;
//         const { text } = req.body;
//
//         const parentComment = await Comment.findById(commentId);
//         if (!parentComment) {
//             return res.status(404).json({ error: 'Parent comment not found' });
//         }
//
//         const newComment = new Comment({
//             userId,
//             bookId,
//             text,
//             parentComment: commentId,
//         });
//
//         const savedComment = await newComment.save();
//
//         // Update the book's comments array
//         await Book.findByIdAndUpdate(bookId, { $push: { comments: savedComment._id } });
//
//         res.status(201).json(savedComment);
//     } catch (error) {
//         console.error('Error replying to comment:', error);
//         res.status(500).json({ error: 'Error replying to comment' });
//     }
// });

export default commentRouter;