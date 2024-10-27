'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useAuth from '@/hooks/useAuth';
import axiosDefault, { axiosWithAuth } from '@/lib/axios';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserComment {
  _id: string;
  username: string;
  email: string;
  image: string;
}

interface Comment {
  _id: number;
  userId?: UserComment;
  content: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

interface Reply {
  _id: string;
  userId?: UserComment;
  content: string;
}
interface ListCommentProps {
  objectId: string;
}
export default function ListComment({ objectId }: ListCommentProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number[]>([]); // Thay đổi từ null thành mảng
  const [replyContent, setReplyContent] = useState('');

  const fetchingComment = async () => {
    try {
      const res = await axiosDefault.get(`/comment/${objectId}`);
      console.log(res.data);
      if (res.status === 200) setComments(res.data);
      // console.log('Location update successful:', res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error fetching comment: ',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = user?.accessToken;
    if (!token) {
      console.warn('User not logged in or session information missing');
      return null;
    }
    if (!newComment.trim()) return null;
    const data = {
      objectId,
      content: newComment,
    };
    try {
      const res = await axiosWithAuth(token).post(`/comment`, data);
      console.log(res.data);
      if (res.status === 200) {
        setNewComment('');
        await fetchingComment();
      }
      // console.log('Location update successful:', res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error comment: ', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleReplySubmit = async (commentId: number) => {
    const token = user?.accessToken;
    if (!token) {
      console.warn('User not logged in or session information missing');
      return null;
    }
    if (!replyContent.trim()) return null;
    const data = {
      // objectId,
      content: replyContent,
    };
    try {
      const res = await axiosWithAuth(token).post(
        `/comment/reply/${commentId}`,
        data,
      );
      console.log(res.data);
      if (res.status === 200) {
        setReplyContent('');
        await fetchingComment();
        setReplyingTo(replyingTo.filter((id) => id !== commentId));
      }
      // console.log('Location update successful:', res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error repply comment: ',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  useEffect(() => {
    fetchingComment();
  }, [objectId]);
  // console.log(user);
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6">Comments</h2>
      {user && user.accessToken && (
        <div>
          {/* Main comment form */}
          <form onSubmit={handleCommentSubmit} className="mb-12">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="mb-4 min-h-[100px]"
            />
            <Button type="submit" size="lg">
              Post Comment
            </Button>
          </form>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-8">
        {comments.map((comment: Comment) => (
          <div key={comment._id} className=" p-6 rounded-lg shadow-sm">
            <div className="flex items-start space-x-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={comment.userId?.image} />
                <AvatarFallback>
                  {comment.userId?.username as string}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {comment.userId?.username}
                </h3>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            </div>
            {user && user.accessToken && (
              <div>
                {/* Reply button */}
                {!replyingTo.includes(comment._id) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setReplyingTo([...replyingTo, comment._id]);
                      console.log(comment._id);
                    }} // Thêm comment.id vào mảng
                    className="mt-2"
                  >
                    Reply
                  </Button>
                )}

                {/* Reply form */}
                {replyingTo.includes(comment._id) && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReplySubmit(comment._id);
                    }}
                    className="mt-6"
                  >
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="mb-4 min-h-[80px]"
                    />
                    <Button type="submit">Post Reply</Button>
                    {/* Close button to hide the reply form */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setReplyingTo(
                          replyingTo.filter((id) => id !== comment._id),
                        );
                        setReplyContent(''); // Clear the reply content
                      }}
                      className="ml-2"
                    >
                      Close
                    </Button>
                  </form>
                )}
              </div>
            )}

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-6 pl-8 border-l-2 border-gray-200">
                {comment.replies.map((reply) => (
                  <div key={reply._id} className="mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={reply.userId?.image} />

                        <AvatarFallback>
                          {reply.userId?.username}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold">
                          {reply.userId?.username}
                        </h4>
                        <p className="mt-1 text-gray-600">{reply.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
