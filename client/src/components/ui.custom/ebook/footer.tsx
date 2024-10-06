import { Button } from '@/components/ui/button';
import useEbookStore from '@/hooks/useEbookStore';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface FooterProps {
  onPageMove: (type: 'prev' | 'next') => void;
  height?: number;
}

export default function Footer({ onPageMove, height }: FooterProps) {
  const { currentLocation, setCurrentLocation } = useEbookStore();

  const handlePreviousPage = () => {
    onPageMove('prev');
  };

  const handleNextPage = () => {
    onPageMove('next');
  };

  console.log(JSON.stringify(currentLocation));
  return (
    <footer className="flex justify-between items-center p-4 border-t h-[20px]">
      <Button variant="ghost" size="icon" onClick={handlePreviousPage}>
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous Page</span>
      </Button>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          {currentLocation.chapterName !== undefined &&
            `${currentLocation.chapterName} - `}
        </span>
        <BookOpen className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {/* Page {currentPage} of {totalPages} */}
          {currentLocation.currentPage !== undefined &&
            currentLocation.totalPage !== undefined &&
            `${currentLocation.currentPage} of ${currentLocation.totalPage}`}
        </span>
      </div>
      <Button variant="ghost" size="icon" onClick={handleNextPage}>
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next Page</span>
      </Button>
    </footer>
  );
}
