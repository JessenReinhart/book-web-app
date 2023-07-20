import React from 'react';
import { Book } from './types';
import { formatPublicationDate, handleImageError } from './utils';

interface BookCardProps {
    book: Book;
    isFavorite: boolean;
    onToggleFavorite: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, onToggleFavorite }) => {
    const handleToggleFavorite = () => {
        onToggleFavorite(book.id);
    };

    const handleClick = (id: number) => {
        window.location.href = `?id=${id}`;
    }

    return (
        <div className="book-card">
            <div className="book-image">
                <img src={book.cover} alt={book.title} onError={handleImageError} />
            </div>
            <div className="book-info">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <p>Published: {formatPublicationDate(book.publicationDate)}</p>
                <button onClick={() => handleClick(book.id)}>Detail</button>
            </div>
            <div className="favorite-button" onClick={handleToggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </div>
        </div>
    );
};

export default BookCard;
