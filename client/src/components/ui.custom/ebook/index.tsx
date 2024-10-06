'use client';
import 'regenerator-runtime/runtime';
import useBookController from '@/hooks/ebook/useBookController';
import { useRef, useState } from 'react';
// import { EpubViewer } from "react-epub-viewer";
import ReactViewer from "@/modules/Reader";
import useBookStyle from "@/hooks/ebook/useBookStyle";
import {Rendition} from "epubjs";
export default function EbookViewer() {
  const [url, setUrl] = useState<string>('Tru Tien - Tieu Dinh.epub');
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
  const { theme, viewerLayout, bookOption } = useBookStyle({ viewerRef });
  const [rendition, setRendition] = useState<Rendition | null>(null);
  return (
    <>
      <ReactViewer
        url={url}
        ref={viewerRef}
        // pageChanged={onPageChange}
        // tocChanged={onTocChange}
        // epubFileOptions={bookOption}
        onPageChange={onPageChange}
        onTocChange={onTocChange}
        viewerStyleURL={theme}
        viewerLayout={viewerLayout}
        viewerOption={bookOption}
      />
    </>
  );
}
