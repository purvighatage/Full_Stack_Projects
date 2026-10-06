// src/pages/ChatPage.js
import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
  LinearProgress,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { ChatWindow } from '../components/Chat/ChatWindow';

export const ChatPage = () => {
  const [bottomNav, setBottomNav] = useState(1); // Chat/Feedback is selected
  const [messages, setMessages] = useState([
    { sender: 'them', text: 'Hi there! How are you?', time: '10:30 AM' },
    { sender: 'me', text: "I'm good, thanks! How about you?", time: '10:32 AM' }
  ]);
  const [messageMilestone] = useState(23);
  const [milestoneTotal] = useState(100);
  const [timer] = useState('36:12:45');
  const [match] = useState({
    name: 'Taylor',
    age: 28,
    profileImage: '', // Replace with actual src if available
    bio: 'Adventurer, reader, and music lover. Let’s talk about dreams and travel!',
  });

  const handleSendMessage = (message) => {
    setMessages([...messages, {
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

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
                src={match.profileImage}
              >
                {match.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight={600}>{match.name}, {match.age}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                "{match.bio}"
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1, borderRadius: 2 }}
                startIcon={<ChatBubbleOutlineIcon />}
                disabled
              >
                Pinned
              </Button>
              <Box sx={{ mt: 3, width: '100%' }}>
                <Typography variant="caption" color="text.secondary">
                  Message Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={messageMilestone}
                  sx={{ height: 8, borderRadius: 2, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {messageMilestone}/{milestoneTotal}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                Time Left: <strong>{timer}</strong>
              </Typography>
            </Box>

            {/* Chat Window */}
            <Box flex={1} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5" fontWeight={700} mb={2}>
                Conversation
              </Typography>
              <Paper elevation={2} sx={{ width: '100%', maxWidth: 500, p: 2, mb: 2, minHeight: 350 }}>
                <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
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
