'use client'
import React, { useEffect, useState } from 'react';
import { Book } from '@/components/ui.custom/home/listbook';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from '@/lib/axios';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Globe,
  PenTool,
  Star,
} from 'lucide-react';
import Link from 'next/link';

export default function BookDetail({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/book/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Error fetching book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <Card>
          <CardHeader className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
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

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Breadcrumb className="p-6">
        <BreadcrumbList className="flex items-center space-x-3 text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="font-semibold hover:underline">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="font-light text-xl">
            /
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold italic">
              {book.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardContent className="p-0">
          <div className="md:flex">
            <div className="md:w-1/3 sticky top-6 self-start">
              <img
                className="h-96 w-full object-cover"
                src={book.cover}
                alt={book.title}
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="flex flex-row space-x-3">
                {book.category.map((c) => (
                  <Badge key={c.name} variant="outline" className="mb-2">
                    {c.name}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-3xl font-bold mb-2">
                {book.title}
              </CardTitle>
              <CardDescription className="text-xl mb-4">
                by {book.author.name}
              </CardDescription>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < ((book as any).rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {(book as any).rating || 'Not rated'}
                </span>
              </div>
              <p className="text-muted-foreground mb-6">{book.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoItem
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Status"
                  value={book.status}
                />
                <InfoItem
                  icon={<Eye className="w-4 h-4" />}
                  label="Views"
                  value={book.views.toString()}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Published"
                  value={new Date(book.createdAt).toLocaleDateString()}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Updated"
                  value={new Date(book.updatedAt).toLocaleDateString()}
                />
              </div>
              <Button asChild>
                <Link href={`/ebook/${book._id}`}>
                  <Globe className="w-4 h-4 mr-2" />
                  Read Book
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About the Author</CardTitle>
        </CardHeader>
        <CardContent className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${book.author.name}`}
            />
            <AvatarFallback>{book.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{book.author.name}</h3>
            <p className="text-muted-foreground">
              {book.author.description || 'No description available'}
            </p>
          </div>
        </CardContent>
      </Card>

      <CardFooter className="flex justify-between p-0">
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
      </CardFooter>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center text-sm">
      {icon}
      <span className="ml-2 font-medium">{label}:</span>
      <span className="ml-1 text-muted-foreground">{value}</span>
    </div>
  );
}