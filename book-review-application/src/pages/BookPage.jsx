import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';

const BookPage = () => {
  const { id } = useParams();
  const { books, loading } = useContext(BookContext);
  const book = books.find(b => b.id === id);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <Rating value={book.rating} />
      {book.reviews?.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default BookPage;