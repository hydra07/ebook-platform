'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import SearchBooks from '@/components/searchBook/page';
interface Book { _id: string; title: string; description: string; cover: string; status: string; }

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/books?page=${currentPage}&limit=9`);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        setError('Failed to delete book. Please try again.');
      }
    }
  };

  const handleSearchResults = (searchResults: Book[]) => {
    setBooks(searchResults);
    setIsSearching(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book List</h1>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <Link href="/admin/createbook" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Create New Book
        </Link>
        <SearchBooks onSearchResults={handleSearchResults} />
        {isSearching && (
          <button 
            onClick={() => { fetchBooks(); setIsSearching(false); }} 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 mt-2 sm:mt-0"
          >
            Clear Search
          </button>
        )}
      </div>

      {isLoading && <div className="text-center">Loading books...</div>}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="border rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
            <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 truncate">{book.title}</h2>
              <p className="text-gray-600 mb-2 h-12 overflow-hidden">{book.description}</p>
              <p className="text-sm text-gray-500 mb-4">Status: {book.status}</p>
              <div className="flex justify-between">
                <Link href={`/admin/bookdetail/${book._id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300">
                  View Details
                </Link>
                <Link href={`/admin/editbook/${book._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-300">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l transition duration-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="bg-gray-200 text-gray-700 font-bold py-2 px-4">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r transition duration-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}