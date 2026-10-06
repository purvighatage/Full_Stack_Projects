import React from 'react';
import {
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Theme colors (match homepage)
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const accentColor = '#ffc107';
const darkColor = '#002171';

// Generates 20 sample books with image URLs
const sampleImageUrl = "https://via.placeholder.com/400x140.png?text=Book+Cover";
const generateSampleBooks = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    price: (10 + Math.random() * 10).toFixed(2),
    description: `Sample description for Book Title ${i + 1}. This is a wonderful book in the genre.`,
    rating: (3.5 + Math.random() * 1.5),
    genre: [
      "Thriller", "Self-Help", "Fantasy", "Memoir", "Fiction", "History", "Biography",
      "Psychology", "Non-Fiction", "Mystery", "Romance", "Classic", "Drama", "Sci-Fi",
      "Adventure", "Literary", "Historical", "Crime", "Mythology", "Magical Realism"
    ][i % 20],
    image: sampleImageUrl,
  }));

const BookListPage = () => {
  // Replace with your context or API data as needed
  const booksToDisplay = generateSampleBooks();

  // Simulate loading if needed
  const loading = false;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: primaryColor,
          fontWeight: 700,
          letterSpacing: '-1px',
          mb: 1
        }}
      >
        Our Book Collection
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Total books: {booksToDisplay.length}
      </Typography>

      <Grid container spacing={4}>
        {booksToDisplay.map((book) => (
          <Grid item xs={12} sm={12} md={6} key={book.id}>
            <Paper
              elevation={4}
              sx={{
                p: 2.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 2,
                borderRadius: 4,
                boxShadow: '0 6px 24px 0 rgba(13, 71, 161, 0.10)',
                background: '#fff',
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, border-top 0.25s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.025)',
                  boxShadow: `0 16px 32px 0 rgba(13, 71, 161, 0.18)`,
                  borderTop: `4px solid ${secondaryColor}`,
                },
              }}
            >
              {/* Image on the left */}
              <Box
                sx={{
                  width: 120,
                  minWidth: 120,
                  height: 140,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  background: 'linear-gradient(120deg, #e3f2fd 60%, #fff 100%)',
                  boxShadow: '0 2px 12px 0 rgba(13, 71, 161, 0.06)',
                  mr: 2
                }}
              >
                <img
                  src={book.image}
                  alt={`${book.title} cover`}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px 0 rgba(13, 71, 161, 0.10)'
                  }}
                />
              </Box>

              {/* Text content on the right */}
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: primaryColor, mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {book.genre} • ₹{parseFloat(book.price).toFixed(2)}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={i}
                        component="span"
                        sx={{
                          color: i < Math.floor(book.rating) ? accentColor : 'grey.300',
                          fontSize: '1.1rem',
                          textShadow: i < Math.floor(book.rating) ? '0 1px 4px #ffd54f55' : 'none',
                          mr: 0.2,
                        }}
                      >
                        ★
                      </Box>
                    ))}
                    <Typography variant="body2" sx={{ ml: 1, color: darkColor, fontWeight: 500 }}>
                      {book.rating.toFixed(1)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ color: darkColor, opacity: 0.92 }}>
                    {book.description.length > 80
                      ? `${book.description.substring(0, 80)}...`
                      : book.description}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to={`/books/${book.id}`}
                    sx={{
                      background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor})`,
                      color: '#fff',
                      fontWeight: 600,
                      borderRadius: 3,
                      boxShadow: '0 2px 8px 0 rgba(255, 152, 0, 0.12)',
                      transition: 'background 0.2s, transform 0.2s',
                      '&:hover': {
                        background: `linear-gradient(90deg, #e65100, #ffd54f)`,
                        color: primaryColor,
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookListPage;
