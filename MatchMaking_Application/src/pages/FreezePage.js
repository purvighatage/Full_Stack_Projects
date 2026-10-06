// src/pages/FreezePage.js
import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export const FreezePage = () => {
  // 24 hours from now for demonstration purposes
  const freezeEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Calculate remaining time (hh:mm:ss)
  const [timeLeft, setTimeLeft] = React.useState('24:00:00');
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = freezeEndTime - now;
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(interval);
      } else {
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [freezeEndTime]);

  // For navigation highlighting
  const [bottomNav, setBottomNav] = React.useState(0);

  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>LT</Avatar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Lone Town
          </Typography>
          <Typography variant="body2" color="text.secondary">
            [State: Frozen]
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
                sx={{ width: 80, height: 80, mb: 2, bgcolor: '#ffe082', color: '#ff9800', fontSize: 40 }}
              >
                <HourglassEmptyIcon sx={{ fontSize: 48 }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} color="warning.main">
                Reflection Freeze
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                You’ve chosen to end your match.<br />
                Please take this time to reflect before meeting someone new.
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  py: 2,
                  px: 3,
                  bgcolor: '#fff3e0',
                  borderRadius: 2,
                  width: '100%',
                  textAlign: 'center',
                  border: '1px solid #ffe0b2',
                }}
              >
                <Typography variant="subtitle2" color="warning.dark" sx={{ mb: 1 }}>
                  Time Remaining
                </Typography>
                <Typography variant="h4" color="warning.main" sx={{ fontFamily: 'monospace' }}>
                  {timeLeft}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="warning"
                sx={{ mt: 3 }}
                disabled
              >
                Waiting...
              </Button>
            </Box>

            {/* Main Freeze Message */}
            <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography variant="h4" fontWeight={700} mb={2} color="warning.main">
                Take a Mindful Pause
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3} maxWidth={400} textAlign="center">
                At Lone Town, every match matters. This 24-hour reflection period is designed to help you process your experience, learn, and prepare for your next meaningful connection.
              </Typography>
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#fffde7', borderRadius: 2 }}>
                <Typography variant="h6" color="warning.dark" mb={1}>
                  Why Reflection?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mindful dating is about intention, not speed. Use this time to consider what you value, how you felt, and what you want in your next connection.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>
        <BottomNavigation
          showLabels
          value={bottomNav}
          onChange={(event, newValue) => setBottomNav(newValue)}
        >
          <BottomNavigationAction label="Onboarding" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Feedback" icon={<FeedbackIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
