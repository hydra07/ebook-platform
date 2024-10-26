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
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: false,
        },
        dateOfBirth: {
            type: Date,
            required: false,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;