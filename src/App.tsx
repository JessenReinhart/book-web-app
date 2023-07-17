import React, { useState, useEffect } from 'react';
import './global.scss';
import BookList from './components/BookList';

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites) as number[]);
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
