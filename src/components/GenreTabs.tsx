
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GenreTabsProps {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreTabs = ({ genres, activeGenre, onGenreChange }: GenreTabsProps) => {
  return (
    <div className="w-full bg-cream/80 backdrop-blur-sm sticky top-0 z-10 py-2 shadow-subtle">
      <Tabs defaultValue={activeGenre} className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto h-auto flex flex-nowrap overflow-x-auto scrollbar-hide bg-cream/50 p-1">
          <TabsTrigger 
            value="all" 
            onClick={() => onGenreChange('all')}
            className={cn(
              "px-4 py-2 whitespace-nowrap",
              activeGenre === 'all' ? "text-accent1 font-medium" : ""
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
                "px-4 py-2 whitespace-nowrap",
                activeGenre === genre ? "text-accent1 font-medium" : ""
              )}
            >
              {genre}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default GenreTabs;
