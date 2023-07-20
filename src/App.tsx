import React, { useState, useEffect } from 'react';

//components
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

//styling
import './global.scss';

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [id, setId] = useState<string | null>(null)

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    setId(getBookIdFromUrl())
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
      {id ? <BookDetail id={id} /> : <BookList favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
    </div>
  );
};

function getBookIdFromUrl() {
// Get the current URL
const currentURL = window.location.href;

// Create a URL object
const url = new URL(currentURL);

// Get the URLSearchParams object from the URL
const searchParams = url.searchParams;

// Get the value of the 'id' parameter
const myID = searchParams.get('id');

return myID || null
};


export default App;
