import {useCallback, useRef, useState} from 'react';
import useEbookStore from '../useEbookStore';

export default function useBookController({ viewerRef }: any) {
  // const [currentLocation, setCurrentLocation] = useState<any | null>(null);
  // const [toc, setToc] = useState<any[]>([]);
  const { currentLocation, setCurrentLocation, setToc } = useEbookStore();

  const onPageMove = useCallback((_type: 'prev' | 'next') => {
    const node = viewerRef.current;
    if (!node || !node.prevPage || !node.nextPage) return;
    _type === 'prev' && node.prevPage();
    _type === 'next' && node.nextPage();
  }, [viewerRef]);

  const onPageChange = useCallback((_page: any) => {
    setCurrentLocation(_page);
  }, [setCurrentLocation]);

  const onTocChange = useCallback((_toc: any[]) => {
    setToc(_toc);
  }, [viewerRef]);

  const onLocationChange = useCallback((_loc: string) => {
    if (!viewerRef.current) return;
    viewerRef.current.setLocation(_loc);
  }, [viewerRef]);

  return {
    currentLocation,
    onPageMove,
    onPageChange,
    onTocChange,
    onLocationChange,
  }
}
