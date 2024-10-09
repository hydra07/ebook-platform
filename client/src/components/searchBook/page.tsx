'use client'

import { useState } from 'react'
import axios from 'axios'
import { Search, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface Book {
  _id: string
  title: string
  description: string
  cover: string
  status: string
}

interface SearchBooksProps {
  onSearchResults: (books: Book[]) => void
}

export default function SearchBooks({ onSearchResults }: SearchBooksProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter a search term",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?query=${encodeURIComponent(query)}`)
      onSearchResults(response.data)
      if (response.data.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
          variant: "default",
        })
      }
    } catch (error) {
      console.error('Error searching books:', error)
      toast({
        title: "Error",
        description: "Failed to search books. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books..."
            className="pl-8"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  )
}