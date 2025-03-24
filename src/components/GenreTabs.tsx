
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GenreTabsProps {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreTabs = ({ genres, activeGenre, onGenreChange }: GenreTabsProps) => {
  return (
    <div className="w-full bg-cream sticky top-0 z-10 py-4 shadow-md border-b border-softgray">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif text-navy font-bold mb-4 text-center">Bookish Reviews</h1>
        <Tabs defaultValue={activeGenre} className="w-full">
          <TabsList className="w-full max-w-3xl mx-auto h-auto flex flex-nowrap overflow-x-auto bg-cream p-1 justify-center">
            <TabsTrigger 
              value="all" 
              onClick={() => onGenreChange('all')}
              className={cn(
                "px-6 py-2 whitespace-nowrap text-base font-medium",
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
                  "px-6 py-2 whitespace-nowrap text-base font-medium",
                  activeGenre === genre 
                    ? "text-accent1 border-b-2 border-accent1" 
                    : "text-charcoal hover:text-navy"
                )}
              >
                {genre}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default GenreTabs;
