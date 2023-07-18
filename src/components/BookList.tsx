import React, { useState, useEffect } from 'react';

import BookCard from './BookCard';
import Pagination from './Pagination';

import './BookCardSkeleton.scss'

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    publicationDate: string;
}

interface BookListProps {
    favorites: number[];
    onToggleFavorite: (bookId: number) => void;
}

const BookList: React.FC<BookListProps> = ({ favorites, onToggleFavorite }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>('');

    const fetchBooks = async () => {
        try {
            let data: Book[] = []
            const responseData = localStorage.getItem("responseData")
            if (responseData) {
                console.log({ responseData })
                data = JSON.parse(responseData)
            } else {
                const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');
                if (!response.ok) {
                    throw new Error('Error fetching books');
                }
                data = await response.json() as Book[];
                localStorage.setItem("responseData", JSON.stringify(data))
            }
            setBooks(data);
        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks().catch((error) => {
            handleError(error)
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleError = (error: unknown) => {
        console.error('Error fetching books:', error);
        setError(error);
    }

    const handleToggleFavorite = (bookId: number) => {
        onToggleFavorite(bookId);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Pagination logic
    const booksPerPage = 5;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    if (isLoading) {
        return (
            <div className="book-list">
                <div className="book-card-container">
                    {/* Render skeleton loaders */}
                    {Array.from({ length: 5 }, (_, index) => (
                        <div className="book-card-skeleton" key={index}></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching data.</div>;
    }

    return ( 
        <>
            <div className="book-list">
                {currentBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        isFavorite={favorites.includes(book.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </div> <
                Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={currentBooks.length}
            /> 
        </>
    );
};

export default BookList;