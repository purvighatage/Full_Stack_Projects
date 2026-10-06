import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

// Theme colors (match homepage)
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const accentColor = '#ffc107';

const JoinCommunityPage = () => {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In real use case, send comment to backend or Firebase
    setComment('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          textAlign: 'center',
          borderRadius: 5,
          boxShadow: '0 8px 32px 0 rgba(13, 71, 161, 0.13)',
          background: 'linear-gradient(120deg, #e3f2fd 60%, #fff 100%)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: '-1px',
            mb: 1,
          }}
        >
          Join Our Telegram Community
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: '#333',
            fontWeight: 500,
            fontSize: '1.1rem',
            opacity: 0.95,
          }}
        >
          Connect with fellow book lovers, share reviews, and discover more books in our Telegram group!
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="https://t.me/YourTelegramGroup" // ← Replace with your real Telegram group link
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mb: 5,
            px: 5,
            py: 1.5,
            fontWeight: 700,
            fontSize: '1.1rem',
            background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor})`,
            color: '#fff',
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(255, 152, 0, 0.12)',
            transition: 'background 0.2s, transform 0.2s',
            '&:hover': {
              background: `linear-gradient(90deg, #e65100, #ffd54f)`,
              color: primaryColor,
              transform: 'scale(1.05)',
            },
          }}
        >
          Join Telegram Group
        </Button>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 2,
            background: 'rgba(255,255,255,0.82)',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            boxShadow: '0 2px 12px 0 rgba(13, 71, 161, 0.06)',
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: primaryColor, fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Leave a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts or suggestions..."
            sx={{
              mb: 2,
              background: '#f5f5f5',
              borderRadius: 2,
              '& .MuiInputBase-input': {
                fontSize: '1rem',
                color: primaryColor,
              },
            }}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor})`,
              color: '#fff',
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
              py: 1,
              boxShadow: '0 2px 8px 0 rgba(255, 152, 0, 0.10)',
              transition: 'background 0.2s, transform 0.2s',
              '&:hover': {
                background: `linear-gradient(90deg, #e65100, #ffd54f)`,
                color: primaryColor,
                transform: 'scale(1.04)',
              },
            }}
            disabled={!comment.trim()}
          >
            Submit
          </Button>
        </Box>

        {submitted && (
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: secondaryColor,
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: '1.05rem',
              transition: 'opacity 0.3s',
            }}
          >
            Thank you for your comment!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default JoinCommunityPage;
