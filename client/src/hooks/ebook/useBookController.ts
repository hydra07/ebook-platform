import { axiosWithAuth } from '@/lib/axios';
import Page from '@/types/page';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useAuth from '../useAuth';
import useEbookStore from '../useEbookStore';

export default function useBookController({ viewerRef }: any) {
  // const [currentLocation, setCurrentLocation] = useState<any | null>(null);
  // const [toc, setToc] = useState<any[]>([]);


  const [initCurrentLocation, setInitCurrentLocation] = useState<Page | null>(
    null,
  );
  const { user } = useAuth();
  const { currentLocation, setCurrentLocation, setToc } = useEbookStore();

  const handleCurrentLocation = async () => {
    const token = user?.accessToken;
    if (!token) {
      console.warn('User not logged in or session information missing');
      return null;
    }
    const data = {
      currentLocation,
    };
    try {
      const res = await axiosWithAuth(token).post(
        '/reader/670c963388ce4da4c956dbf7',
        data,
      );
      // console.log('Location update successful:', res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error updating location:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const onPageMove = useCallback(
    (_type: 'prev' | 'next') => {
      const node = viewerRef.current;
      if (!node || !node.prevPage || !node.nextPage) return;
      _type === 'prev' && node.prevPage();
      _type === 'next' && node.nextPage();
    },
    [viewerRef],
  );

  const onPageChange = useCallback(
    (_page: any) => {
      setCurrentLocation(_page);
    },
    [setCurrentLocation],
  );

  const onTocChange = useCallback(
    (_toc: any[]) => {
      setToc(_toc);
    },
    [viewerRef],
  );

  const onLocationChange = useCallback(
    (_loc: string) => {
      if (!viewerRef.current) return;
      viewerRef.current.setLocation(_loc);
    },
    [viewerRef],
  );
  //
  useEffect(() => {
    if (currentLocation.currentPage !== 0) {
      handleCurrentLocation();
    }
  }, [currentLocation]);

  return {
    currentLocation,
    onPageMove,
    onPageChange,
    onTocChange,
    onLocationChange,
  };
}
