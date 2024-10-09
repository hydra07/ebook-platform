'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

interface Book {
  _id: string;
  title: string;
  description: string;
  cover: string;
  status: string;
  createdAt: string; // Assuming createdAt is a string
  category?: {
    name: string;
  };
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
          params: {
            category: selectedCategory,
            startDate,
            endDate,
          },
        });
        if (Array.isArray(response.data.books)) {
          setBooks(response.data.books);
        } else {
          throw new Error('Expected an array of books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategory, startDate, endDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative bg-gradient-to-r from-gray-800 to-black text-white text-center py-20 mb-6 rounded-lg shadow-lg overflow-hidden">
        <p className="mt-4 text-lg font-semibold">Discover a world of knowledge and adventure.</p>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/img/eBook-Cover-Template-psd-min.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Book Library</h1>

      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mr-2 p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Fiction">tình cảm</option>
          <option value="Non-Fiction">Non-Fiction</option>
          {/* Add more categories as needed */}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg transform hover:scale-105">
            <CardHeader>
              <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
              <p className="text-gray-600">{book.description}</p>
              <p className="text-sm text-gray-500">Status: {book.status}</p>
              <p className="text-sm text-gray-500">Category: {book.category ? book.category.name : 'N/A'}</p>
              <Link href={`/books/${book._id}`} className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}