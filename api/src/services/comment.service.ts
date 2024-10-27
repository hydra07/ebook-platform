import Comment from '../models/comment.model';

export async function addComment(
  userId: string,
  objectId: string,
  content: string,
): Promise<InstanceType<typeof Comment>> {
  const comment = new Comment({
    userId,
    objectId,
    content,
  });
  return await comment.save();
}

export async function getCommentsByObjectId(
  objectId: string,
): Promise<InstanceType<typeof Comment>[] | null> {
  console.log(objectId);
  return await Comment.find({ objectId })
    .populate('userId', 'username email image')
    .populate({
      path: 'replies.userId',
      select: 'username email image',
    });
}

export async function addReply(
  rootCommentId: string,
  userId: string,
  content: string,
) {
  const rootComment = await Comment.findById(rootCommentId);
  if (!rootComment) throw new Error('Comment not found');
  rootComment.replies.push({ userId, content });
  return await Comment.updateOne({ _id: rootCommentId }, rootComment);
}
