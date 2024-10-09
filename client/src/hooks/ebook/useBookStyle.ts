//theme,bookOption,bookStyle,viewerLayout,

import useEbookStore from '@/hooks/useEbookStore';
import { useCallback } from 'react';

export default function useBookStyle({ viewerRef }: any) {
  const {
    theme,
    setTheme,
    bookOption,
    setBookOption,
    viewerLayout,
    setViewerLayout,
    bookStyle,
    setBookStyle,
  } = useEbookStore();

  const onThemeChange = useCallback(
    (_type: 'dark' | 'light') => {
      setTheme(
        _type === 'dark' ? '/themes/dark.theme.css' : '/themes/light.theme.css',
      );
    },
    [viewerRef],
  );

  // đọc dọc,ngang
  const onDirection = useCallback(
    (_type: 'Horizontal' | 'Vertical') => {
      if (_type === 'Horizontal') {
        setBookOption({ ...bookOption, flow: 'paginated' });
      } else {
        setBookOption({ ...bookOption, flow: 'scrolled-doc' });
      }
    },
    [viewerRef, bookOption],
  );

  // phân trang
  const onViewType = useCallback(
    (_isSpread: boolean) => {
      if (_isSpread) {
        setBookOption({ ...bookOption, spread: 'auto' });
      } else {
        setBookOption({ ...bookOption, spread: 'none' });
      }
    },
    [viewerRef, bookOption],
  );

  // thay fontsize
  const onFontSize = useCallback(
    (_size: number) => {
      setBookStyle({ ...bookStyle, fontSize: _size });
    },
    [viewerRef, bookStyle],
  );

  // khoảng cách giữa các dòng
  const onLineHeight = useCallback(
    (_size: number) => {
      setBookStyle({ ...bookStyle, lineHeight: _size });
    },
    [viewerRef, bookStyle],
  );

  // margin vertical
  const onMarginVertical = useCallback(
    (_size: number) => {
      setBookStyle({ ...bookStyle, marginVertical: _size });
    },
    [viewerRef, bookStyle],
  );

  // margin horizontal
  const onMarginHorizontal = useCallback(
    (_size: number) => {
      setBookStyle({ ...bookStyle, marginHorizontal: _size });
    },
    [viewerRef, bookStyle],
  );

  return {
    theme,
    onThemeChange,
    viewerLayout,
    setViewerLayout,
    bookOption,
    bookStyle,
    onDirection,
    onViewType,
    onFontSize,
    onLineHeight,
    onMarginVertical,
    onMarginHorizontal,
  };
}
