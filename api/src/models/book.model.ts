import { Schema, model, Document, Types  } from 'mongoose';
import Author from './author.model';
// Define an interface for the Book model
interface IBook extends Document {
  title: string;
  description: string;
  cover: string;
  views: number;
  status: string;
  createdAt: Date;
  lastUpdateAt: Date;
  bookUrl: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  price: number;
  currentQuantity: number;
}

// Define the Book schema
const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['ONGOING', 'COMPLETED', 'DISCONTINUED'], // Example status options, adjust as needed
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now,
  },
  bookUrl: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  currentQuantity: {
    type: Number,
    default: 0,
    required: true,
  }
});

bookSchema.index({ title: 'text', description: 'text', 'author.name': 'text', 'category.name': 'text'});
// Create the Book model
const Book = model<IBook>('Book', bookSchema);

export default Book;
