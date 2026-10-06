import { useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  styled,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Color constants
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const darkColor = '#002171';
const lightColor = '#f5f5f5';
const accentColor = '#ffc107';

// Styled Components
const HeroPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(120deg, #0d47a1 60%, #1565c0 100%)',
  color: theme.palette.common.white,
  padding: theme.spacing(10, 2, 8, 2),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px 0 rgba(13, 71, 161, 0.2)',
  position: 'relative',
  overflow: 'hidden',
}));

const FeaturedBookCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderTop: `4px solid ${secondaryColor}`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 24px 0 rgba(13, 71, 161, 0.08)',
  background: '#fff',
  transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.03)',
    boxShadow: `0 16px 32px 0 rgba(13, 71, 161, 0.18)`,
    borderTop: `4px solid ${accentColor}`,
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor})`,
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  padding: theme.spacing(1.5, 5),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 2px 8px 0 rgba(255, 152, 0, 0.15)',
  transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
  '&:hover': {
    background: `linear-gradient(90deg, #e65100, #ffd54f)`,
    transform: 'scale(1.05)',
    boxShadow: '0 6px 24px 0 rgba(255, 152, 0, 0.18)',
  },
}));

// Hardcoded featured books with images
const hardcodedBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81eGkZfG4kL.jpg',
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'A proven framework for improving—every day. Atomic Habits will reshape the way you think about progress and success, and give you the tools to transform your habits.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
  },
  {
    id: '3',
    title: 'Educated',
    author: 'Tara Westover',
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg',
  }
];

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(110deg, #f5f5f5 70%, #e3f2fd 100%)' }}>
      {/* Hero Section */}
      <HeroPaper elevation={4}>
        <Container maxWidth="md" disableGutters>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, letterSpacing: '-2px', mb: 2 }}>
            Discover Your Next <span style={{ color: accentColor }}>Favorite Book</span>
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 5, color: '#e3f2fd', fontWeight: 400 }}>
            Read honest reviews and connect with a vibrant community of book lovers.
          </Typography>
          <AnimatedButton
            variant="contained"
            size="large"
            component={Link}
            to={isAuthenticated ? "/books" : "/join-community"}
          >
            {isAuthenticated ? "Browse Books" : "Join Our Community"}
          </AnimatedButton>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            right: -80,
            bottom: -60,
            width: 320,
            height: 320,
            background: 'radial-gradient(circle, #1565c0 30%, transparent 80%)',
            opacity: 0.18,
            zIndex: 0,
            borderRadius: '50%',
          }}
        />
      </HeroPaper>

      {/* Featured Books Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: '-1px',
          }}
        >
          Featured Books
        </Typography>

        <Grid container spacing={4}>
          {hardcodedBooks.map((book) => (
            <Grid item xs={12} sm={4} key={book.id}>
              <FeaturedBookCard elevation={4}>
                <Avatar
                  variant="rounded"
                  src={book.cover}
                  alt={book.title}
                  sx={{
                    width: 90,
                    height: 130,
                    mb: 2,
                    boxShadow: '0 4px 16px 0 rgba(13, 71, 161, 0.10)'
                  }}
                />
                <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 600, mb: 1, textAlign: 'center' }}>
                  {book.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
                  by {book.author}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: darkColor }}>
                  {book.description.substring(0, 90)}...
                </Typography>
                <AnimatedButton
                  component={Link}
                  to={`/books/${book.id}`}
                  size="small"
                  sx={{ width: '100%', mt: 'auto' }}
                >
                  View Details
                </AnimatedButton>
              </FeaturedBookCard>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper elevation={3} sx={{
          p: 6,
          textAlign: 'center',
          my: 6,
          borderRadius: 4,
          background: 'linear-gradient(90deg, #0d47a1 80%, #1565c0 100%)',
          color: 'white',
          boxShadow: '0 6px 32px 0 rgba(13, 71, 161, 0.18)'
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to share your thoughts?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4 }}>
            Join our community of book enthusiasts and start reviewing today!
          </Typography>
          <AnimatedButton
            size="large"
            component={isAuthenticated ? Link : 'a'}
            to={isAuthenticated ? "/books" : undefined}
            href={!isAuthenticated ? "https://t.me/YourTelegramGroup" : undefined}
            target={!isAuthenticated ? "_blank" : undefined}
            rel="noopener noreferrer"
            sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
          >
            {isAuthenticated ? "Browse Books" : "Join Telegram"}
          </AnimatedButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
