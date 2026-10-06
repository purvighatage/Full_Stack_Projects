// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  LinearProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

export const ProfilePage = () => {
  const [bottomNav, setBottomNav] = useState(2); // Profile is selected
  const navigate = useNavigate();

  const user = {
    name: 'Jordan',
    age: 29,
    pronouns: 'they/them',
    profileImage: '', // replace with actual src
    bio: 'Book lover and amateur chef. Deep thinker with a love for quiet mornings and spontaneous road trips.',
    coreValues: ['Trust', 'Growth', 'Empathy'],
    interests: ['Hiking', 'Art', 'Cooking'],
    preferences: ['Long-term', 'Open to relocate'],
    messages: 23,
    timer: '36:12:45',
    frozen: false,
  };

  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh' }}>
      {/* App Bar */}
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

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {/* Sidebar */}
            <Box
              sx={{
                minWidth: 220,
                bgcolor: '#e3f2fd',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 1,
              }}
            >
              <Avatar
                sx={{ width: 80, height: 80, mb: 2, bgcolor: '#90caf9', fontSize: 40 }}
                src={user.profileImage}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight={600}>Your Profile</Typography>
              <Typography variant="body1" color="text.secondary">{user.name}, {user.age}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                "{user.bio.split('.')[0]}."
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1, borderRadius: 2 }}
                startIcon={<EditIcon />}
                onClick={() => alert('Open Edit Modal')}
              >
                Edit
              </Button>
              <Box sx={{ mt: 3, width: '100%' }}>
                <Typography variant="caption" color="text.secondary">
                  Message Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={user.messages}
                  sx={{ height: 8, borderRadius: 2, mb: 1 }}
                  valueBuffer={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {user.messages}/100
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                Time Left: <strong>{user.timer}</strong>
              </Typography>
              {user.frozen && (
                <Box mt={2} color="orange">
                  🔒 You're in reflection mode.
                </Box>
              )}
            </Box>

            {/* Main Profile Details */}
            <Box flex={1} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5" fontWeight={700} mb={2}>
                Profile Details
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2} maxWidth={400}>
                "{user.bio}"
              </Typography>
              <Box mb={2} width="100%">
                <Typography variant="subtitle2" gutterBottom>
                  Core Values:
                </Typography>
                {user.coreValues.map((val) => (
                  <Chip key={val} label={val} sx={{ m: 0.5 }} color="primary" />
                ))}
              </Box>
              <Box mb={2} width="100%">
                <Typography variant="subtitle2" gutterBottom>
                  Interests:
                </Typography>
                {user.interests.map((interest) => (
                  <Chip key={interest} label={interest} sx={{ m: 0.5 }} color="secondary" />
                ))}
              </Box>
              <Box mb={2} width="100%">
                <Typography variant="subtitle2" gutterBottom>
                  Preferences:
                </Typography>
                {user.preferences.map((pref) => (
                  <Chip key={pref} label={pref} sx={{ m: 0.5 }} />
                ))}
              </Box>
              <Box mt={2} width="100%" display="flex" flexDirection="column" gap={1}>
                <Button variant="outlined" startIcon={<LockIcon />} fullWidth>
                  Change Password
                </Button>
                <Button variant="outlined" startIcon={<NotificationsIcon />} fullWidth>
                  Notifications
                </Button>
                <Button variant="outlined" startIcon={<LogoutIcon />} fullWidth color="error">
                  Log Out
                </Button>
              </Box>
            </Box>
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
            if (newValue === 0) navigate('/onboarding');
            if (newValue === 1) navigate('/feedback');
            if (newValue === 2) navigate('/profile');
          }}
        >
          <BottomNavigationAction label="Onboarding" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Feedback" icon={<FeedbackIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
