'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Book, ChevronLeft, ChevronRight, PlusCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SearchBooks from '@/components/searchBook/page'

interface Book {
  _id: string
  title: string
  description: string
  cover: string
  status: string
}

export default function Component() {
  const [books, setBooks] = useState<Book[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBooks()
  }, [currentPage])

  const fetchBooks = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(`http://localhost:5000/api/books?page=${currentPage}&limit=9`)
      setBooks(response.data.books)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching books:', error)
      setError('Failed to fetch books. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`)
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
        setError('Failed to delete book. Please try again.')
      }
    }
  }

  const handleSearchResults = (searchResults: Book[]) => {
    setBooks(searchResults)
    setIsSearching(true)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Book Library</h1>
        <Link href="/admin/createbook">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Book
          </Button>
        </Link>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <SearchBooks onSearchResults={handleSearchResults} />
        {isSearching && (
          <Button variant="outline" onClick={() => { fetchBooks(); setIsSearching(false); }}>
            <X className="mr-2 h-4 w-4" />
            Clear Search
          </Button>
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="bg-red-50 border-red-200 p-4">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={book.cover} alt={book.title} className="w-20 h-27 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/bookdetail/${book._id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                  <Link href={`/admin/editbook/${book._id}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}