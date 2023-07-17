import React from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    publicationDate: string;
}

interface BookCardProps {
    book: Book;
    isFavorite: boolean;
    onToggleFavorite: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, onToggleFavorite }) => {
    const handleToggleFavorite = () => {
        onToggleFavorite(book.id);
    };

    const formatPublicationDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric', month: 'long', year: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <div className="book-card">
            <div className="book-image">
                <img src={book.cover} alt={book.title} />
            </div>
            <div className="book-info">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <p>Published: {formatPublicationDate(book.publicationDate)}</p>
            </div>
            <div className="favorite-button" onClick={handleToggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </div>
        </div>
    );
};

export default BookCard;
