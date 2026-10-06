import { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Theme colors (match homepage)
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const accentColor = '#ffc107';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5, 4),
  maxWidth: 420,
  margin: 'auto',
  marginTop: theme.spacing(10),
  borderRadius: 20,
  background: 'linear-gradient(120deg, #e3f2fd 60%, #fff 100%)',
  boxShadow: '0 8px 32px 0 rgba(13, 71, 161, 0.13)',
}));

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // After signup, redirect to the original destination or /books
  const from = location.state?.from?.pathname || '/books';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <StyledPaper elevation={6}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: '-1px',
            mb: 3,
          }}
        >
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, fontWeight: 500 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              background: '#f5f5f5',
              borderRadius: 2,
              '& .MuiInputBase-input': { color: primaryColor, fontWeight: 500 },
              '& .MuiInputLabel-root': { color: primaryColor },
            }}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              background: '#f5f5f5',
              borderRadius: 2,
              '& .MuiInputBase-input': { color: primaryColor, fontWeight: 500 },
              '& .MuiInputLabel-root': { color: primaryColor },
            }}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
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
                transform: 'scale(1.04)',
              },
            }}
            disabled={loading || !email || !password}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: primaryColor, fontWeight: 500 }}>
              Already have an account?{' '}
              <Link
                to="/login"
                state={{ from }}
                style={{
                  color: secondaryColor,
                  textDecoration: 'none',
                  fontWeight: 700,
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => (e.target.style.color = accentColor)}
                onMouseOut={e => (e.target.style.color = secondaryColor)}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default SignupPage;
