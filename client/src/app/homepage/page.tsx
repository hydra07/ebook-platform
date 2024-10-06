'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Book {
  _id: string;
  title: string;
  description: string;
  cover: string;
  status: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        console.log('API Response:', response.data); // Log the response data
        // Extract the books array from the response
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
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Enhanced Hero Section */}
      <div className="relative bg-black-700 text-white text-center py-20 mb-6">
     
        <p className="mt-4 text-lg">Discover a world of knowledge and adventure.</p>
        <Link href="/books" className="mt-6 inline-block bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          Explore Books
        </Link>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/img/eBook-Cover-Template-psd-min.jpg')" }}></div>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Book Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
              <p className="text-gray-600">{book.description}</p>
              <p className="text-sm text-gray-500">Status: {book.status}</p>
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}