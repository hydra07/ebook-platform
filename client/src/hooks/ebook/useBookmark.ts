import { isCfiInRange } from '@/utils/ebook.utils';
import { useCallback } from 'react';
import useEbookStore from '../useEbookStore';

export default function useBookMark({ viewerRef }: any) {
  const { bookMarks, setBookMarks, currentLocation } = useEbookStore();

  const addBookmark = useCallback(
    (_currentLocation: any) => {
      const bookmark = {
        key: Date.now(),
        name: `Bookmark`,
        cfi: _currentLocation.startCfi,
        chapter: _currentLocation.chapterName,
        page: _currentLocation.currentPage,
        date: new Date().toLocaleString(),
      };
      setBookMarks([...bookMarks, bookmark]);
    },
    [bookMarks],
  );

  const removeBookmark = useCallback(
    (_cfi: string) => {
      const bookMarksFilter = bookMarks.filter(
        (bookmark) => bookmark.cfi !== _cfi,
      );
      setBookMarks(bookMarksFilter);
    },
    [bookMarks],
  );

  // const isBookmarkAdded = useMemo(
  //   () =>
  //     bookMarks.find((bookmark) =>
  //       isCfiInRange(
  //         bookmark.cfi,
  //         currentLocation.startCfi,
  //         currentLocation.endCfi,
  //       ),
  //     ),
  //   [bookMarks, currentLocation],
  // );

  // console.log('currentLocation in bookmark', currentLocation);
  const isBookmarkAdded = bookMarks.find((bookmark) =>
    isCfiInRange(
      bookmark.cfi,
      currentLocation.startCfi,
      currentLocation.endCfi,
    ),
  );

  
  return {
    bookMarks,
    addBookmark,
    removeBookmark,
    isBookmarkAdded,
  };
}
