import { useEffect, useState } from "react";

import { Book } from "./types";
import { formatPublicationDate, handleImageError } from "./utils";

const BookDetail: React.FC<{ id: string }> = ({ id }: { id: string }) => {
  const [details, setDetails] = useState<Book>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://my-json-server.typicode.com/cutamar/mock/books/${id}`
      );
      if (!response.ok) {
        throw new Error("Error fetching books");
      }
      const data = (await response.json()) as Book;
      setDetails(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) return "Loading...";
  if (!details || error) return `Error displaying details: ${error}`;
  return (
    <section className="detail-page">
      <img src={details.cover} alt={details.title} onError={handleImageError} />
      <div className="detail-content">
        <h2>{details.title}</h2>
        <p>{details.author}</p>
        <small>
          Published: {formatPublicationDate(details.publicationDate)}
        </small>
        <p>{details.description}</p>
        <button onClick={() => (window.location.href = "/")}>Back</button>
      </div>
    </section>
  );
};

export default BookDetail;
