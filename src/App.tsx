import React, { useState, useEffect } from 'react';

//components
import BookList from './components/BookList';

//styling
import './global.scss';

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites) as number[];
      setFavorites(parsedFavorites);
    }
  }, []);

  // Update favorites in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (bookId: number) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  return (
    <div className="app">
      <h1>Book Web App</h1>
      <BookList favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default App;
