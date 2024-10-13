import {Schema, model, Document, Types, Query} from 'mongoose';

interface IComment extends Document {
    userId: Types.ObjectId;
    bookId: Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

// commentSchema.pre<Query<any, IComment>>(/^find/, function (next) {
//     this.populate({ path: 'userId', select: 'username' });
//     next();
// });
const Comment = model<IComment>('Comment', commentSchema);

export default Comment;