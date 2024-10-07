import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    //--provider---
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    //-------------
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: [String],
      required: true,
      default: ['user'],
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
