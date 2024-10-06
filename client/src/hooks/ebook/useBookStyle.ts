
//theme,bookOption,bookStyle,viewerLayout,

import {useCallback} from "react";
import useEbookStore from "@/hooks/useEbookStore";

export  default  function useBookStyle({ viewerRef }: any){
    const { theme, setTheme ,bookOption,setBookOption, viewerLayout,setViewerLayout} = useEbookStore();
    const onThemeChange = useCallback((_type: 'dark' | 'light') => {
        setTheme(_type === 'dark' ? '/themes/dark.theme.css' : '/themes/light.theme.css');
    }, [viewerRef]);

    // đọc dọc,ngang
    const onDirection = useCallback((_type:  'Horizontal' | 'Vertical') => {
        if (_type === 'Horizontal') {
            setBookOption({ ...bookOption,flow: 'paginated' });
        } else {
            setBookOption({ ...bookOption,flow: 'scrolled-doc' });
        }
    },[viewerRef,bookOption]);

    // phân trang
    const onViewType = useCallback((_isSpread: boolean) => {
        if (_isSpread) {
            setBookOption({ ...bookOption,spread: 'auto' });
        } else {
            setBookOption({ ...bookOption,spread: 'none' });
        }
    },[viewerRef,bookOption])

    return {
        theme,
        onThemeChange,
        viewerLayout,
        setViewerLayout,
        bookOption,
        onDirection,
        onViewType
    }
}