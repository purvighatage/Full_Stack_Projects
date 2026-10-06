import { Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Theme colors (match homepage)
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const accentColor = '#ffc107';
const darkColor = '#002171';

const BookCard = ({ book, showActions = false }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: '0 6px 24px 0 rgba(13, 71, 161, 0.10)',
        background: '#fff',
        transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.025)',
          boxShadow: `0 16px 32px 0 rgba(13, 71, 161, 0.18)`,
          borderTop: `4px solid ${secondaryColor}`,
        },
      }}
    >
      {/* Book Cover */}
      <Box
        sx={{
          mb: 2,
          height: 210,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 3,
          background: 'linear-gradient(120deg, #e3f2fd 60%, #fff 100%)',
          boxShadow: '0 2px 12px 0 rgba(13, 71, 161, 0.06)',
        }}
      >
        <img
          src={book.coverImage}
          alt={book.title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: 8,
            boxShadow: '0 2px 8px 0 rgba(13, 71, 161, 0.10)'
          }}
        />
      </Box>

      {/* Book Info */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 700, mb: 0.5 }}>
          {book.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          by {book.author}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                color: i < Math.floor(book.rating) ? accentColor : 'grey.300',
                fontSize: '1.15rem',
                textShadow: i < Math.floor(book.rating) ? '0 1px 4px #ffd54f55' : 'none',
                mr: 0.2,
              }}
            >
              ★
            </Box>
          ))}
          <Typography variant="body2" sx={{ ml: 1, color: darkColor, fontWeight: 500 }}>
            {book.rating?.toFixed(1)}
          </Typography>
        </Box>
        <Typography paragraph sx={{ mt: 1, color: darkColor, opacity: 0.92 }}>
          {book.description?.substring(0, 120)}...
        </Typography>
      </Box>

      {/* Actions */}
      {showActions && (
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            component={Link}
            to={`/books/${book._id || book.id}`} // supports both MongoDB and sample data
            variant="contained"
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
            fullWidth
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{
              borderRadius: 3,
              fontWeight: 600,
              borderWidth: 2,
              borderColor: '#ff5252',
              color: '#ff5252',
              background: 'rgba(255,82,82,0.04)',
              '&:hover': {
                background: 'rgba(255,82,82,0.14)',
                borderColor: '#ff1744',
                color: '#ff1744',
                transform: 'scale(1.05)'
              }
            }}
          >
            Delete
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default BookCard;
