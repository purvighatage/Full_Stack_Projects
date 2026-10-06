import { useContext, useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  styled, 
  Grid, 
  Avatar, 
  Tabs, 
  Tab,
  CircularProgress,
  Alert,
  Divider,
  Chip
} from '@mui/material';
import { BookContext } from '../context/BookContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard'; // Assuming you have a BookCard component

const ProfilePaper = styled(Paper)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/profile-bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(8),
  marginBottom: theme.spacing(4),
  height: '40vh',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
}));

const ProfilePage = () => {
  const { userBooks, loading, error, fetchUserBooks } = useContext(BookContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserBooks();
    }
  }, [isAuthenticated, fetchUserBooks]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Please sign in to view your profile
        </Typography>
        <Button 
          variant="contained" 
          component={Link}
          to="/login"
          size="large"
          sx={{ mt: 3 }}
        >
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Profile Header */}
      <ProfilePaper elevation={3}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Avatar
                alt={user?.name}
                src={user?.avatar || '/images/default-avatar.jpg'}
                sx={{ 
                  width: 150, 
                  height: 150,
                  border: '4px solid white',
                  margin: '0 auto'
                }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                {user?.name}
              </Typography>
              <Typography variant="h6" paragraph>
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Chip 
                  label={`${userBooks?.length || 0} Books Reviewed`} 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  label={`${user?.followersCount || 0} Followers`} 
                  color="secondary" 
                  variant="outlined"
                />
                <Chip 
                  label={`${user?.followingCount || 0} Following`} 
                  color="success" 
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ProfilePaper>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Content */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="My Reviews" />
            <Tab label="Reading List" />
            <Tab label="Favorites" />
            <Tab label="Settings" />
          </Tabs>

          <Divider sx={{ mb: 3 }} />

          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                My Book Reviews
              </Typography>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ mb: 4 }}>
                  Failed to load your books. Please try again later.
                </Alert>
              ) : userBooks?.length > 0 ? (
                <Grid container spacing={4}>
                  {userBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                      <BookCard book={book} showActions />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    You haven't reviewed any books yet
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link}
                    to="/books"
                    sx={{ mt: 2 }}
                  >
                    Browse Books
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                My Reading List
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your reading list is empty
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link}
                  to="/books"
                  sx={{ mt: 2 }}
                >
                  Discover Books
                </Button>
              </Box>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                My Favorite Books
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  You haven't added any favorites yet
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link}
                  to="/books"
                  sx={{ mt: 2 }}
                >
                  Browse Books
                </Button>
              </Box>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Account Settings
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Profile Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Name:</strong> {user?.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ mt: 2 }}
                    >
                      Edit Profile
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Account Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button variant="outlined" color="primary">
                        Change Password
                      </Button>
                      <Button variant="outlined" color="secondary">
                        Connect Social Accounts
                      </Button>
                      <Button variant="outlined" color="error">
                        Delete Account
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;