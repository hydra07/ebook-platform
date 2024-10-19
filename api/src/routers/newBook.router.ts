import { Router } from 'express';
import { getBook, getBookById, newBook } from '../services/book.service';

const router = Router();
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const book = newBook(data);
    res.status(200).json({
      book,
      message: 'Created success!',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const options = {
      authorName: req.query.authorName as string | undefined,
      title: req.query.title as string | undefined,
      category: req.query.category as string | string[] | undefined,
      sortBy: req.query.sortBy as
        | 'title'
        | 'createdAt'
        | 'updatedAt'
        | undefined,
      sortOrder: req.query.sortOrder as 'asc' | 'desc' | undefined,
    };
    const skip = parseInt(req.query.skip as string);
    const take = parseInt(req.query.take as string);

    const { books, total } = await getBook(options, skip, take);
    res.status(200).json({ books, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the request parameters
    const book = await getBookById(id); // Call the service to get the book by ID
    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); // Handle not found case
    }
    res.status(200).json(book); // Return the found book
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
