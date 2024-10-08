import {
  cfiRangeSpliter,
  compareCfi,
  timeFormatter,
} from '@/utils/ebook.utils';
import { useCallback, useEffect, useState } from 'react';
import useEbookStore, { Color, Highlight } from '../useEbookStore';

export default function useSelection({ viewerRef, onLocationChange }: any) {
  const {
    currentLocation,
    setCurrentLocation,
    highlights,
    setHighlights,
    color,
  } = useEbookStore();

  const [selection, setSelection] = useState<Highlight | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const onSelection = useCallback(
    (cfiRange: string) => {
      if (!viewerRef.current) return false;

      const iframe = viewerRef.current.querySelector('iframe');
      if (!iframe) return false;

      const iframeWin = iframe.contentWindow;
      if (!iframeWin) return false;

      const content = iframeWin.getSelection()!.toString().trim();
      console.log(content, currentLocation);
      // onOpen();

      setSelection({
        key: Date.now(),
        cfiRange,
        content,
        createAt: timeFormatter(new Date()),
        chapterName: currentLocation.chapterName,
        pageNum: currentLocation.currentPage,
        // note: '',
      });
      console.log('ls', highlights);
      setOpen(true);
    },
    [viewerRef, highlights, selection, currentLocation],
  );

  const onHighlight = useCallback(
    (color: Color) => {
      if (!viewerRef.current) return;
      if (!selection) return;
      const newSelection = {
        ...selection,
        color: color.code,
      };
      setSelection(newSelection);

      const updatedHighlights = (() => {
        const existingHighlightIndex = highlights.findIndex(
          (item: Highlight) => item.key === selection.key,
        );

        if (existingHighlightIndex !== -1) {
          return highlights.map((highlight, index) =>
            index === existingHighlightIndex ? newSelection : highlight,
          );
        } else {
          return [...highlights, newSelection];
        }
      })();

      setHighlights(updatedHighlights);
    },
    [viewerRef, highlights, selection, setSelection, currentLocation],
  );

  const goToHighLight = useCallback(
    (selection: Highlight) => {
      const startCfi = cfiRangeSpliter(selection.cfiRange)?.startCfi;
      if (!startCfi) return;
      onLocationChange(startCfi);
    },
    [viewerRef, onLocationChange],
  );

  const onRemoveHighlight = useCallback(
    (highlight: Highlight) => {
      if (!viewerRef.current) return;
      const newHighlights = highlights.filter(
        (item) => item.key !== highlight.key,
      );
      setHighlights(newHighlights);
      viewerRef.current.offHighlight(highlight.cfiRange);
      setSelection(null);
    },
    [viewerRef, highlights],
  );

  const onHighlightClick = useCallback((highlight: Highlight) => {
    // setOpen(true);
    setOpen(true);
    setSelection(highlight);
  }, []);

  // const contextItem = useCallback(() => {
  //   if (!selection) return null;
  //   return (

  //   );
  // }, []);

  useEffect(() => {
    if (!viewerRef.current) return;
    const iframe = viewerRef.current!.querySelector('iframe');
    if (!iframe) return;

    const iframeWin = iframe.contentWindow;
    if (!iframeWin) return;

    highlights.forEach((item) => {
      const cfiRange = cfiRangeSpliter(item.cfiRange);
      if (!cfiRange) return;
      const { startCfi } = cfiRange;
      if (
        compareCfi(currentLocation.startCfi, startCfi) < 1 &&
        compareCfi(currentLocation.endCfi, startCfi) > -1
      ) {
        viewerRef.current?.onHighlight(
          item.cfiRange,
          (e: any) => {
            onHighlightClick(item);
          },
          item.color,
        );
        iframeWin.getSelection()!.removeAllRanges();
      }
    });
  }, [
    viewerRef,
    highlights,
    currentLocation,
    onHighlightClick,
    onLocationChange,
  ]);

  return {
    selection,
    onSelection,
    onHighlight,
    onRemoveHighlight,
    setOpen,
    open,
    goToHighLight,
    onHighlightClick,
    // listHighLight,
  };
}
