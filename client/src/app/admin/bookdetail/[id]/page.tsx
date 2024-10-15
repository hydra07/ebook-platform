'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BookOpen, Calendar, Eye, Globe, PenTool, Clock, Star, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  _id?: string;
  name: string;
  description?: string;
}

interface Category {
  _id?: string;
  name: string;
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
  bookUrl: string;
  author: Author | string;
  rating?: number;
  category?: Category | string;
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

  const getAuthorInfo = () => {
    if (!book || !book.author) {
      return { name: 'Unknown', description: 'No description available' };
    }
    return typeof book.author === 'string' ? { name: book.author, description: 'No description available' } : book.author;
  };

  const getCategoryInfo = () => {
    if (!book || !book.category) {
      return { name: 'Unknown' };
    }
    return typeof book.category === 'string' ? { name: book.category } : book.category;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="md:flex">
          <div className="md:w-1/3">
            <Skeleton className="h-[calc(100vh-3rem)] w-full rounded-lg" />
          </div>
          <div className="md:w-2/3 md:pl-8 space-y-8">
            <Card>
              <CardHeader className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="flex items-start space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="container mx-auto p-6 mt-10">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!book) {
    return (
      <Card className="container mx-auto p-6 mt-10">
        <CardHeader>
          <CardTitle>Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Book not found</p>
        </CardContent>
      </Card>
    );
  }

  const authorInfo = getAuthorInfo();
  const categoryInfo = getCategoryInfo();

  return (
    <div className="container mx-auto p-6">
      <div className="md:flex md:space-x-8">
        <div className="md:w-1/4">
          <div className="sticky top-6">
            <img 
              className="w-full object-cover object-center rounded-lg shadow-lg"
              style={{ maxHeight: '500px' }} 
              src={book.cover} 
              alt={book.title} 
            />
          </div>
        </div>
        <div className="md:w-2/3 space-y-8">
          <Card>
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-2">{categoryInfo.name}</Badge>
              <CardTitle className="text-3xl font-bold mb-2">{book.title}</CardTitle>
              <CardDescription className="text-xl mb-4">by {authorInfo.name}</CardDescription>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < (book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{book.rating ? `${book.rating.toFixed(1)} / 5.0` : 'Not rated'}</span>
              </div>
              <p className="text-muted-foreground mb-6">{book.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoItem icon={<BookOpen className="w-4 h-4" />} label="Status" value={book.status} />
                <InfoItem icon={<Eye className="w-4 h-4" />} label="Views" value={book.views.toString()} />
                <InfoItem icon={<Calendar className="w-4 h-4" />} label="Published" value={new Date(book.createdAt).toLocaleDateString()} />
                <InfoItem icon={<Clock className="w-4 h-4" />} label="Updated" value={new Date(book.lastUpdateAt).toLocaleDateString()} />
              </div>
              <Button asChild>
                <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  Read Book
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${authorInfo.name}`} />
                <AvatarFallback>{authorInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{authorInfo.name}</h3>
                <p className="text-muted-foreground">{authorInfo.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button asChild variant="outline">
              <Link href={`/admin/editbook/${book._id}`}>
                <PenTool className="w-4 h-4 mr-2" />
                Edit Book
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin/listbook">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-center text-sm">
      {icon}
      <span className="ml-2 font-medium">{label}:</span>
      <span className="ml-1 text-muted-foreground">{value}</span>
    </div>
  );
}