import mongoose, { Schema } from 'mongoose';


const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^\d{10}$/; // Matches 10-digit numbers
  return phoneRegex.test(phoneNumber);
};

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
    phoneNumber: {
      type: String,
      required: false,
      validate: [validatePhoneNumber, 'Invalid phone number'],
    },
    gender: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

const User =
  // mongoose.models.User ||
  mongoose.model('User', userSchema);
export default User;
