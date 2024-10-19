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

const Book =
  // mongoose.models.Reader ||
  mongoose.model('Book', bookSchema);
export default Book;
