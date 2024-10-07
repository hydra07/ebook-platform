import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import useEbookStore from '@/hooks/useEbookStore';
import { cn } from '@/lib/utils';
import { BookOption } from '@/types/ebook';
import { motion } from 'framer-motion';
import { AlignLeft, BookCopy, Bookmark, Settings } from 'lucide-react';
import { useCallback, useState } from 'react';

interface HeaderProps {
  onLocation: (loc: string) => void;
  style: {
    onDirection: (type: 'Horizontal' | 'Vertical') => void;
    onThemeChange: (type: 'dark' | 'light') => void;
    onViewType: (isSpread: boolean) => void;
    bookOption: BookOption;
  };
  bookmark: {
    addBookmark: (currentLocation: any) => void;
    removeBookmark: (cfi: string) => void;
    isBookmarkAdded: boolean;
  };
  height?: number;
}
interface TocProps {
  onLocation: (loc: string) => void;
}
interface StyleProps {
  style: {
    onDirection: (type: 'Horizontal' | 'Vertical') => void;
    onThemeChange: (type: 'dark' | 'light') => void;
    onViewType: (isSpread: boolean) => void;
    bookOption: BookOption;
  };
}
interface BookmarksProps {
  onLocation: (loc: string) => void;
  bookmark: {
    addBookmark: (currentLocation: any) => void;
    removeBookmark: (cfi: string) => void;
    isBookmarkAdded: boolean;
  };
}

export default function Header({
  onLocation,
  style,
  bookmark,
  height = 30,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'flex justify-between items-center p-4 mb-1',
        `h-[${height}px]`,
      )}
    >
      <Toc onLocation={onLocation} />
      <div className="flex space-x-2">
        <Bookmarks bookmark={bookmark} onLocation={onLocation} />
        <Style style={style} />
      </div>
    </header>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Toc({ onLocation }: TocProps) {
  const { toc } = useEbookStore();

  const onClickItem = useCallback(
    (loc: string) => {
      onLocation(loc);
    },
    [onLocation],
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <AlignLeft className="h-6 w-6" />
          <span className="sr-only">Table of Contents</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Table of Contents
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] mt-6">
          <motion.div
            className="flex flex-col space-y-2 pr-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {toc.map((item: any, index: number) => (
              <motion.div key={index} variants={itemVariants}>
                <SheetClose asChild>
                  <motion.div
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      onClick={() => onClickItem(item.href)}
                    >
                      <motion.span
                        className="text-sm font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item.label}
                      </motion.span>
                    </Button>
                  </motion.div>
                </SheetClose>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function Style({ style }: StyleProps) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Settings className="h-6 w-6" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Font Size</Label>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              defaultValue={[16]}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Theme</Label>
            <Select
              onValueChange={(value) =>
                style.onThemeChange(value as 'dark' | 'light')
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Reading Direction</Label>
            <div className="flex flex-row space-x-2">
              <span>Vertical</span>
              <Switch
                id="direction"
                defaultChecked={isHorizontal}
                onCheckedChange={(checked) => {
                  console.log('checked', checked);
                  style.onDirection(checked ? 'Horizontal' : 'Vertical');
                  setIsHorizontal(checked);
                }}
              />
              <span>Horizontal</span>
            </div>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => onDirection('Horizontal')}
              className="w-28"
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Horizontal
            </Button> */}
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Spread View</Label>
            <Switch
              id="view-type"
              onCheckedChange={(checked) => style.onViewType(checked)}
              disabled={isHorizontal}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Bookmarks({ onLocation, bookmark }: BookmarksProps) {
  const { currentLocation, bookMarks } = useEbookStore();
  const goToBookmark = useCallback(
    (_bookmark: any) => {
      const cfi = _bookmark.cfi;
      onLocation(cfi);
    },
    [onLocation],
  );

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'hover:bg-gray-200 dark:hover:bg-gray-800',
          bookmark.isBookmarkAdded && 'text-yellow-400 hover:text-yellow-500',
        )}
        onClick={() => {
          console.log('add bookmark ', currentLocation);
          bookmark.isBookmarkAdded
            ? bookmark.removeBookmark(currentLocation.startCfi)
            : bookmark.addBookmark(currentLocation);
          console.log('bookmarks', bookMarks);
        }}
      >
        <Bookmark className="h-6 w-6" />
        <span className="sr-only">Bookmarks</span>
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <BookCopy className="h-6 w-6" />
            <span className="sr-only">Bookmarks</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Bookmarks</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-80px)] mt-6">
            <motion.div
              className="flex flex-col space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {bookMarks.length === 0 ? (
                <div className="text-center text-gray-400">
                  No bookmarks added yet
                </div>
              ) : (
                <div className="space-y-2">
                  {bookMarks.map((bookmark) => (
                    <motion.div key={bookmark.key} variants={itemVariants}>
                      <SheetClose>
                        <Button
                          variant="ghost"
                          onClick={() => goToBookmark(bookmark)}
                        >
                          <motion.span
                            className="text-sm font-medium"
                            whileHover={{ x: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            Page {bookmark.page}
                            {' - '}
                            {bookmark.chapter !== undefined
                              ? bookmark.chapter
                              : bookmark.name}
                          </motion.span>
                        </Button>
                      </SheetClose>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
