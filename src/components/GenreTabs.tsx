
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface GenreTabsProps {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreTabs = ({ genres, activeGenre, onGenreChange }: GenreTabsProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsRef.current.scrollLeft += scrollAmount;
    }
  };

  const checkScrollButtons = () => {
    if (tabsRef.current) {
      setShowLeftArrow(tabsRef.current.scrollLeft > 0);
      setShowRightArrow(
        tabsRef.current.scrollLeft < 
        tabsRef.current.scrollWidth - tabsRef.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const currentTabsRef = tabsRef.current;
    if (currentTabsRef) {
      currentTabsRef.addEventListener('scroll', checkScrollButtons);
      // Check initially
      checkScrollButtons();
      // Check after images and content are loaded
      window.addEventListener('load', checkScrollButtons);
      // Check on resize
      window.addEventListener('resize', checkScrollButtons);
    }

    return () => {
      if (currentTabsRef) {
        currentTabsRef.removeEventListener('scroll', checkScrollButtons);
      }
      window.removeEventListener('load', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  return (
    <div className="w-full bg-cream sticky top-0 z-10 py-3 md:py-4 shadow-md border-b border-softgray">
      <div className="container mx-auto px-3 md:px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy font-bold mb-3 md:mb-4 text-center">Bookish Reviews</h1>
        <Tabs defaultValue={activeGenre} className="w-full relative">
          {/* Scroll left button */}
          {showLeftArrow && (
            <button 
              onClick={() => scrollTabs('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-cream/90 rounded-full p-1 shadow-md hover:bg-cream md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          <TabsList 
            ref={tabsRef}
            className="w-full max-w-3xl mx-auto h-auto flex flex-nowrap overflow-x-auto bg-cream p-1 justify-start md:justify-center scrollbar-none"
          >
            <TabsTrigger 
              value="all" 
              onClick={() => onGenreChange('all')}
              className={cn(
                "px-4 md:px-6 py-1.5 md:py-2 whitespace-nowrap text-sm md:text-base font-medium min-w-max",
                activeGenre === 'all' 
                  ? "text-accent1 border-b-2 border-accent1" 
                  : "text-charcoal hover:text-navy"
              )}
            >
              All Books
            </TabsTrigger>
            
            {genres.map((genre) => (
              <TabsTrigger
                key={genre}
                value={genre}
                onClick={() => onGenreChange(genre)}
                className={cn(
                  "px-4 md:px-6 py-1.5 md:py-2 whitespace-nowrap text-sm md:text-base font-medium min-w-max",
                  activeGenre === genre 
                    ? "text-accent1 border-b-2 border-accent1" 
                    : "text-charcoal hover:text-navy"
                )}
              >
                {genre}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Scroll right button */}
          {showRightArrow && (
            <button 
              onClick={() => scrollTabs('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-cream/90 rounded-full p-1 shadow-md hover:bg-cream md:hidden"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default GenreTabs;
