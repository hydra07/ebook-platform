import { Request, Response } from 'express';
import Book from '../models/book.model';
import Author from '../models/author.model';
import Category from '../models/catagory.model';

export const createBook = async (req: Request, res: Response) => {
  try {
    const { author, category, ...bookData } = req.body;

    // Find or create the author
    let authorDocument = await Author.findOne({ name: author.name });
    if (!authorDocument) {
      authorDocument = new Author({
        name: author.name,
        description: author.description // Assuming description is part of the author data
      });
      await authorDocument.save();
    }

    // Find or create the category
    let categoryDocument = await Category.findOne({ name: category.name });
    if (!categoryDocument) {
      categoryDocument = new Category({
        name: category.name
      });
      await categoryDocument.save();
    }

    // Create the book with the author and category references
    const newBook = new Book({
      ...bookData,
      author: authorDocument._id,
      category: categoryDocument._id
    });

    const savedBook = await newBook.save();

    // Populate the author details in the response
    await savedBook.populate('author');

    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(400).json({ 
      message: 'Error creating book', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};
export const getAllBooks = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const books = await Book.find()
        .skip(skip)
        .limit(limit);
  
      const totalBooks = await Book.countDocuments();
      const totalPages = Math.ceil(totalBooks / limit);
  
      res.status(200).json({
        books,
        currentPage: page,
        totalPages,
        totalBooks,
      });
    } catch (error) {
      res.status(400).json({ message: 'Error fetching books', error });
    }
  };

  export const getBookById = async (req: Request, res: Response) => {
    try {
      const book = await Book.findById(req.params.id).populate('author');
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching book', error });
    }
  };

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdateAt: new Date()
      },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required and must be a string' });
    }
    console.log('query: ',query)

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'author.name': { $regex: query, $options: 'i' } },
        { 'category.name': { $regex: query, $options: 'i' } }
      ]
    })
    .limit(10)
    .lean()
    .exec();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error in searchBooks:', error);
    res.status(500).json({ 
      message: 'Error searching books', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};