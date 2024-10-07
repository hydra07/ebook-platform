'use client';
import useBookController from '@/hooks/ebook/useBookController';
import useBookStyle from '@/hooks/ebook/useBookStyle';
import { useRef, useState } from 'react';
import { ReactEpubViewer as ReactViewer } from 'react-epub-viewer';
import 'regenerator-runtime/runtime';
// import ReactViewer from '@/modules/Reader';
import useBookMark from '@/hooks/ebook/useBookmark';
import Footer from './footer';
import Header from './header';
import Loading from './loading';
// import {Rendition} from "epubjs";
export default function EbookViewer() {
  const [url, setUrl] = useState<string>(
    'https://res.cloudinary.com/dws8h9utn/raw/upload/v1728325552/Cu%C3%8C%C2%81%20So%C3%8C%C2%82%C3%8C%C2%81c%20Tu%C3%8C%C2%9Bo%C3%8C%C2%9Bng%20Lai%20-%20Alvin%20Toffler.epub',
  );
  const viewerRef = useRef<any>(null);
  const {
    currentLocation,
    //   isFetching,
    onPageMove,
    onPageChange,
    onTocChange,
    onLocationChange,
    //   updateBook,
  } = useBookController({ viewerRef });
  const {
    theme,
    viewerLayout,
    bookOption,
    onDirection,
    onThemeChange,
    onViewType,
  } = useBookStyle({ viewerRef });
  const { addBookmark, removeBookmark, isBookmarkAdded } = useBookMark({
    viewerRef,
  });
  // const [rendition, setRendition] = useState<Rendition | null>(null);
  return (
    <>
      <Header
        // height={20}
        onLocation={onLocationChange}
        style={{
          onDirection,
          onThemeChange,
          onViewType,
          bookOption,
        }}
        bookmark={{
          addBookmark,
          removeBookmark,
          isBookmarkAdded,
        }}
      />
      <ReactViewer
        url={url}
        ref={viewerRef}
        onPageChange={onPageChange}
        onTocChange={onTocChange}
        viewerStyleURL={theme}
        viewerLayout={viewerLayout}
        viewerOption={bookOption}
        loadingView={<Loading />}
      />
      <Footer
        onPageMove={onPageMove}
        // height={20}
      />
    </>
  );
}
