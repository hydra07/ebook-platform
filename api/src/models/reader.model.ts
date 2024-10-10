import mongoose, { Schema } from 'mongoose';

const readerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    currentLocation: {
      chapterName: {
        type: String,
      },
      currentPage: {
        type: Number,
      },
      totalPage: {
        type: Number,
      },
      startCfi: {
        type: String,
      },
      endCfi: {
        type: String,
      },
      base: {
        type: String,
      },
    },
    highlights: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Highlight',
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookmark',
      },
    ],
  },
  { timestamps: true },
);

const Reader =
  // mongoose.models.Reader ||
  mongoose.model('Reader', readerSchema);
export default Reader;
