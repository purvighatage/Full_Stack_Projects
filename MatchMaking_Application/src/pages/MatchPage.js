// src/pages/MatchPage.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  Container,
  LinearProgress,
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export const MatchPage = () => {
  const navigate = useNavigate();

  const [match] = useState({
    id: '123',
    name: 'Alex',
    age: 26,
    pronouns: 'They/Them',
    bio: 'Enjoy hiking and reading philosophy.',
    profileImage: '', // You can use a placeholder or real URL
    compatibilityScore: 87,
    isPinned: true,
    interests: ['Hiking', 'Philosophy', 'Photography'],
  });

  const [bottomNav, setBottomNav] = useState(1); // Highlight "Matched"

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>LT</Avatar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Lone Town
          </Typography>
          <Typography variant="body2" color="text.secondary">
            [State: Matched]
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Match Card */}
      <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Avatar
            src={match.profileImage}
            alt={match.name}
            sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
          >
            {match.name.charAt(0)}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {match.name}, {match.age}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {match.pronouns}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {match.bio}
          </Typography>

          <Box sx={{ mb: 2 }}>
            {match.interests.map((interest) => (
              <Chip key={interest} label={interest} sx={{ m: 0.5 }} />
            ))}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Compatibility Score
            </Typography>
            <LinearProgress
              variant="determinate"
              value={match.compatibilityScore}
              sx={{ height: 10, borderRadius: 2, mb: 1 }}
            />
            <Typography variant="caption">{match.compatibilityScore}%</Typography>
          </Box>

          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button variant="contained" color="primary">
              Pin
            </Button>
            <Button variant="outlined" color="secondary">
              Unpin
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>
        <BottomNavigation
          showLabels
          value={bottomNav}
          onChange={(event, newValue) => {
            setBottomNav(newValue);
            if (newValue === 0) navigate('/');
            if (newValue === 1) navigate('/match');
            if (newValue === 2) navigate('/feedback');
            if (newValue === 3) navigate('/profile');
          }}
        >
          <BottomNavigationAction label="Onboarding" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Matched" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Feedback" icon={<FeedbackIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
