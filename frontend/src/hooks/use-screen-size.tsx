
import { useState, useEffect } from 'react';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ScreenSizes {
  xs: boolean; // < 640px
  sm: boolean; // >= 640px
  md: boolean; // >= 768px
  lg: boolean; // >= 1024px
  xl: boolean; // >= 1280px
  '2xl': boolean; // >= 1536px
  current: ScreenSize;
}

export function useScreenSize(): ScreenSizes {
  const [screenSize, setScreenSize] = useState<ScreenSizes>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    current: 'md',
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      const newScreenSize: ScreenSizes = {
        xs: width < 640,
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536,
        current: 'md',
      };
      
      // Set current screen size
      if (width < 640) newScreenSize.current = 'xs';
      else if (width < 768) newScreenSize.current = 'sm';
      else if (width < 1024) newScreenSize.current = 'md';
      else if (width < 1280) newScreenSize.current = 'lg';
      else if (width < 1536) newScreenSize.current = 'xl';
      else newScreenSize.current = '2xl';
      
      setScreenSize(newScreenSize);
    };

    // Set initial sizes
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}
