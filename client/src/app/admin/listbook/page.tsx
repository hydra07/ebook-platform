'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Book, ChevronLeft, ChevronRight, Loader2, PlusCircle, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="h-48 bg-gray-200" />
              <CardContent className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="h-8 bg-gray-200 rounded w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book._id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardHeader className="p-0">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-xl font-semibold truncate">{book.title}</CardTitle>
                <p className="text-gray-600 h-12 overflow-hidden">{book.description}</p>
                <p className="text-sm text-gray-500">Status: {book.status}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Link href={`/admin/bookdetail/${book._id}`}>
                  <Button variant="outline" size="sm">
                    <Book className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/editbook/${book._id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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