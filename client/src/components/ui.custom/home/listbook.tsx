'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

// Define types for our data structure
type Book = {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  publishDate: string;
  isbn: string;
};

type Category = {
  id: number;
  name: string;
  books: Book[];
};

// Sample data with longer descriptions
const categories: Category[] = [
  {
    id: 1,
    name: 'Fiction',
    books: [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
        publishDate: '1925',
        isbn: '9780743273565',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          'The story of young Scout Finch, her brother Jem, and their father Atticus, as they navigate issues of racial injustice in their small Southern town. A classic of modern American literature.',
        publishDate: '1960',
        isbn: '9780446310789',
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          'A dystopian social science fiction novel set in a totalitarian society. It explores the consequences of government overreach, mass surveillance, and repressive regimentation of people and behaviors.',
        publishDate: '1949',
        isbn: '9780451524935',
      },
      {
        id: 4,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          'A romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
        publishDate: '1813',
        isbn: '9780141439518',
      },
    ],
  },
  {
    id: 2,
    name: 'Non-Fiction',
    books: [
      {
        id: 5,
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          'A brief history of humankind, exploring the ways in which biology and history have defined us and enhanced our understanding of what it means to be human.',
        publishDate: '2014',
        isbn: '9780062316097',
      },
      {
        id: 6,
        title: 'The Immortal Life of Henrietta Lacks',
        author: 'Rebecca Skloot',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          "The story of Henrietta Lacks and the immortal cell line, known as HeLa, that came from her cancer cells in 1951. It explores ethical issues in medical research and the impact on Lacks' family.",
        publishDate: '2010',
        isbn: '9781400052189',
      },
      {
        id: 7,
        title: 'In Cold Blood',
        author: 'Truman Capote',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          "A non-fiction novel detailing the brutal 1959 murders of Herbert Clutter, a wealthy farmer from Holcomb, Kansas, and his family. Capote's work is regarded as a pioneering example of the non-fiction novel.",
        publishDate: '1966',
        isbn: '9780679745587',
      },
    ],
  },
  {
    id: 3,
    name: 'Science Fiction',
    books: [
      {
        id: 8,
        title: 'Dune',
        author: 'Frank Herbert',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the desert planet Arrakis, the only source of the 'spice' melange, the most important and valuable substance in the universe.",
        publishDate: '1965',
        isbn: '9780441172719',
      },
      {
        id: 9,
        title: "The Hitchhiker's Guide to the Galaxy",
        author: 'Douglas Adams',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          'The comedic science fiction series follows the adventures of Arthur Dent, the last surviving man following the demolition of Earth to make way for a hyperspace bypass.',
        publishDate: '1979',
        isbn: '9780345391803',
      },
      {
        id: 10,
        title: 'Neuromancer',
        author: 'William Gibson',
        coverUrl: '/placeholder.svg?height=200&width=150',
        description:
          'A groundbreaking cyberpunk novel that explores artificial intelligence, cyberspace, and technological body modification in a dystopian near-future setting.',
        publishDate: '1984',
        isbn: '9780441569595',
      },
    ],
  },
];

export default function ListBook() {
  const [listCategory, setListCategory] = useState<
    { category: string; cout: number }[] | null
  >();
  useEffect(() => {
    const fetchListCategory = async () => {
      const res = await axios.get('/book/category');
      const data = await res.data;
      setListCategory(data);
    };
    fetchListCategory();
  }, []);
  useEffect(() => {
    const fetchBook = async (category: string) => {
      const res = await axios.get(
        `/book/?category=${encodeURIComponent(category)}`,
      );
      const data = await res.data;
      console.log(data);
    };
    if (listCategory) {
      console.log('chay lis cate');
      listCategory.forEach(async (category) => {
        fetchBook(category.category);
      });
    }
  }, [listCategory]);
  return (
    <TooltipProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Books by Category</h1>
        {categories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {category.books.map((book) => (
                  <CarouselItem
                    key={book.id}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card className="h-full">
                          <CardContent className="flex flex-col items-center p-6 h-full">
                            <img
                              src={book.coverUrl}
                              alt={`Cover of ${book.title}`}
                              className="w-32 h-48 object-cover mb-4"
                            />
                            <h3 className="font-semibold text-lg text-center line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {book.author}
                            </p>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="w-80 p-4">
                        <h4 className="font-bold mb-2">{book.title}</h4>
                        <p className="text-sm mb-2">by {book.author}</p>
                        <p className="text-sm mb-2">
                          {book.description.length > 150
                            ? `${book.description.substring(0, 150)}...`
                            : book.description}
                        </p>
                        <p className="text-sm">
                          <strong>Published:</strong> {book.publishDate}
                        </p>
                        <p className="text-sm">
                          <strong>ISBN:</strong> {book.isbn}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
