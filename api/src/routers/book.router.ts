<<<<<<< HEAD
import express from "express";
import { adminAuthMiddleware } from "../middlewares/admin.middleware";
import ratingRouter from "./rating.router";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controller/book.controller";
import roleRequire from "../configs/middleware.config";
const router = express.Router();
// Public routes
router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
// Admin-only route
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.use("/:bookId/ratings", ratingRouter);

export default router;
=======
// import express from 'express';
// import { adminAuthMiddleware } from '../middlewares/admin.middleware';
// import {
//   createBook,
//   getAllBooks,
//   getBookById,
//   updateBook,
//   deleteBook,
//   searchBooks
// } from '../controller/book.controller';

// const router = express.Router();

// // Public routes
// router.get('/', getAllBooks);
// router.get('/search', searchBooks);
// router.get('/:id', getBookById);

// // Admin-only route
// router.post('/', createBook);
// router.put('/:id', updateBook);
// router.delete('/:id', deleteBook);

// export default router;
>>>>>>> main
