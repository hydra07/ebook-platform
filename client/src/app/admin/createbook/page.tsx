'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ImageUploader } from '@/components/image-upload';
import { env } from '@/lib/validateEnv';
export default function CreateBook() {
  const router = useRouter();
  const [book, setBook] = useState({
    title: '',
    description: '',
    cover: '',
    status: 'ONGOING',
    bookUrl: '',
    author: {
      name: '',
      description: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      setBook(prevBook => ({
        ...prevBook,
        author: {
          ...prevBook.author,
          [authorField]: value
        }
      }));
    } else {
      setBook(prevBook => ({ ...prevBook, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setBook(prevBook => ({ ...prevBook, [name]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('description', book.description);
    formData.append('status', book.status);
    formData.append('authorName', book.author.name);
    formData.append('authorDescription', book.author.description);
    if (book.cover) {
      formData.append('cover', book.cover);
    }
    if (book.bookUrl) {
      formData.append('bookUrl', book.bookUrl);
    }

    try {
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      router.push('/admin/listbook');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

    const handleImageUploadSuccess = (url: string) => {
      setBook(prevBook => ({ ...prevBook, cover: url }));
      console.log(url);
    };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            {/* <ImageUploader onUploadSuccess={handleImageUploadSuccess}
            /> */}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={book.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="DISCONTINUED">Discontinued</option>
            </select>
          </div>
          <div>
            <label htmlFor="bookUrl" className="block text-sm font-medium text-gray-700 mb-1">Book File</label>
            <input
              type="file"
              id="bookUrl"
              name="bookUrl"
              accept=".epub,.pdf" // Adjust the accepted file types as needed
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
          <input
            type="text"
            id="authorName"
            name="author.name"
            value={book.author.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="authorDescription" className="block text-sm font-medium text-gray-700 mb-1">Author Description</label>
          <textarea
            id="authorDescription"
            name="author.description"
            value={book.author.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <Link
            href="/admin/listbook"
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Back to List
          </Link>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Create Book
          </button>
        </div>
      </form>
    </div>
  );
}