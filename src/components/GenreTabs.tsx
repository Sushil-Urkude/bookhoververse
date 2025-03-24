
import { useState } from 'react';

interface GenreTabsProps {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreTabs = ({ genres, activeGenre, onGenreChange }: GenreTabsProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex space-x-4 md:space-x-8 py-4 min-w-max">
        <button
          className={`genre-tab ${activeGenre === 'all' ? 'active' : ''}`}
          onClick={() => onGenreChange('all')}
        >
          All
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-tab ${activeGenre === genre ? 'active' : ''}`}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreTabs;
