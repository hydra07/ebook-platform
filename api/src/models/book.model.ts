<<<<<<< HEAD
import { Schema, model, Document, Types } from "mongoose";
import Author from "./author.model";
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
  rating: number;
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
    enum: ["ONGOING", "COMPLETED", "DISCONTINUED"], // Example status options, adjust as needed
    default: "draft",
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
    ref: "Author",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
});

bookSchema.index({
  title: "text",
  description: "text",
  "author.name": "text",
  "category.name": "text",
});
// Create the Book model
const Book = model<IBook>("Book", bookSchema);
=======
import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
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
      default: 'ONGOING',
    },
    bookUrl: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    // author: {
    //   name: {
    //     type: String,
    //     require: true,
    //     trim: true
    //   },
    //   description: {
    //     type: String,
    //     require: true,
    //     trim: true,
    //   }
    // },

    category: [
      {
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);
>>>>>>> main

const Book =
  // mongoose.models.Reader ||
  mongoose.model('Book', bookSchema);
export default Book;
