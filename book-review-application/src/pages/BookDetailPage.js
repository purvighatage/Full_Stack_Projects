import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Paper, Box, CircularProgress, Alert } from '@mui/material';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`http://localhost:5000/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>{book.title}</Typography>
        <Typography variant="h6" gutterBottom>by {book.author}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Genre: {book.genre} • ₹{book.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Rating: {book.rating} ★
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">{book.description}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookDetailPage;
