'use client';

import { useState } from 'react';
import axios from 'axios';

interface Book {
  _id: string;
  title: string;
  description: string;
  cover: string;
  status: string;
}

interface SearchBooksProps {
  onSearchResults: (books: Book[]) => void;
}

export default function SearchBooks({ onSearchResults }: SearchBooksProps) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
      onSearchResults(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Search
        </button>
      </div>
    </form>
  );
}