'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BookOpen, Calendar, Eye, Globe, PenTool, Clock, Star } from 'lucide-react';

interface Author {
  _id?: string;
  name: string;
  description?: string;
}

interface Book {
  _id: string;
  title: string;
  description: string;
  cover: string;
  views: number;
  status: string;
  createdAt: string;
  lastUpdateAt: string;
  url: string;
  author: Author | string;
  rating?: number;
  genre?: string;
}

export default function BookDetail({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${params.id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Error fetching book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!book) return <div className="text-center mt-10">Book not found</div>;

  const getAuthorInfo = () => {
    if (typeof book.author === 'string') {
      return { name: 'Unknown', description: 'No description available' };
    }
    return book.author as Author;
  };

  const authorInfo = getAuthorInfo();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-96 w-full object-cover md:w-96" src={book.cover} alt={book.title} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{book.genre || 'Fiction'}</div>
              <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{book.title}</h1>
              <p className="mt-2 text-xl text-gray-500">by {authorInfo.name}</p>
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < (book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
                <span className="ml-2 text-gray-600">{book.rating || 'Not rated'}</span>
              </div>
              <p className="mt-4 text-gray-500">{book.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <InfoItem icon={<BookOpen className="w-5 h-5" />} label="Status" value={book.status} />
                <InfoItem icon={<Eye className="w-5 h-5" />} label="Views" value={book.views.toString()} />
                <InfoItem icon={<Calendar className="w-5 h-5" />} label="Published" value={new Date(book.createdAt).toLocaleDateString()} />
                <InfoItem icon={<Clock className="w-5 h-5" />} label="Updated" value={new Date(book.lastUpdateAt).toLocaleDateString()} />
              </div>
              <div className="mt-6">
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Globe className="w-5 h-5 mr-2" />
                  Read Book
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">About the Author</h2>
            <p className="mt-2 text-gray-600">{authorInfo.description || 'No description available'}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Link href={`/admin/editbook/${book._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PenTool className="w-5 h-5 mr-2" />
            Edit Book
          </Link>
          <Link href="/admin/listbook" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-center text-gray-600">
      {icon}
      <span className="ml-2 font-semibold">{label}:</span>
      <span className="ml-1">{value}</span>
    </div>
  );
}