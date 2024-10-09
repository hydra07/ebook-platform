import mongoose, { Schema } from 'mongoose';

const highlightSchema = new Schema(
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
    key: {
      type: Number,
    },
    cfiRange: {
      type: String,
    },
    content: {
      type: String,
    },
    color: {
      type: String,
    },
    chapterName: {
      type: String,
    },
    pageNum: {
      type: Number,
    },
    lastAccess: {
      type: String,
    },
  },
  { timestamps: true },
);

const Highlight =
  // mongoose.models.Highlight ||
  mongoose.model('Highlight', highlightSchema);
export default Highlight;
