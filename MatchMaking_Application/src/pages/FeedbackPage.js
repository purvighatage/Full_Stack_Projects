// src/pages/FeedbackPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
  Button,
  Divider,
  IconButton,
  Badge,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Feedback as FeedbackIcon,
  Person as PersonIcon,
  Insights as InsightsIcon,
  ArrowBack as ArrowBackIcon,
  HelpOutline as HelpOutlineIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  EmojiEvents as EmojiEventsIcon,
  EmojiObjects as EmojiObjectsIcon
} from '@mui/icons-material';

export const FeedbackPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [bottomNav, setBottomNav] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();

  // Simulated improvement score for progress bar
  const improvementScore = 70;

  const feedback = {
    communication: {
      text: "Your response times were slower than what your match prefers.",
      rating: 3,
      improvement: "Aim to respond within 12-24 hours for better engagement."
    },
    values: {
      text: "Different perspectives on long-term relationship goals.",
      rating: 2,
      improvement: "Consider discussing future expectations earlier in conversations."
    },
    suggestions: {
      text: "Try being more responsive in early conversations and clarify your relationship expectations sooner.",
      rating: 4,
      improvement: "These adjustments could improve your match success rate by 30%."
    }
  };

  const handleNavigation = (newValue) => {
    setBottomNav(newValue);
    if (newValue === 0) navigate('/match');
    if (newValue === 1) navigate('/feedback');
    if (newValue === 2) navigate('/profile');
  };

  const renderRatingStars = (rating) => (
    <Box display="flex" gap={0.5} mb={1}>
      {[...Array(5)].map((_, i) => (
        <FavoriteIcon 
          key={i}
          fontSize="small"
          sx={{
            color: i < rating ? theme.palette.error.main : theme.palette.action.disabled,
            transition: 'color 0.2s'
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
        minHeight: '100vh',
        pb: isMobile ? 7 : 0,
        position: 'relative'
      }}
    >
      {/* Header */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              mx: 2,
              ...(isMobile && { width: 32, height: 32 })
            }}
          >
            LT
          </Avatar>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 2,
              ...(isMobile && { fontSize: '1rem' })
            }}
          >
            Match Insights
          </Typography>
          <Box display="flex" gap={1}>
            <Tooltip title={bookmarked ? "Remove Bookmark" : "Bookmark"}>
              <IconButton onClick={() => setBookmarked(!bookmarked)}>
                <Badge color="error" variant="dot" invisible={!bookmarked}>
                  <BookmarkIcon color={bookmarked ? 'primary' : 'action'} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 3, mb: isMobile ? 0 : 3 }}>
        <Paper
          elevation={isMobile ? 0 : 3}
          sx={{
            p: isMobile ? 2 : 4,
            borderRadius: 3,
            bgcolor: isMobile ? 'transparent' : 'background.paper',
            boxShadow: isMobile ? 'none' : '0 8px 32px rgba(0,0,0,0.08)'
          }}
        >
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {/* Sidebar - Only on desktop */}
            {!isMobile && (
              <Paper
                elevation={3}
                sx={{
                  minWidth: 260,
                  bgcolor: theme.palette.primary.light,
                  borderRadius: 3,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'sticky',
                  top: 20,
                  height: 'fit-content',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    bgcolor: theme.palette.warning.main,
                    color: theme.palette.warning.contrastText,
                    boxShadow: 3,
                    border: `3px solid ${theme.palette.background.paper}`
                  }}
                >
                  <InsightsIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
                  Your Match Insights
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2, fontStyle: 'italic' }}>
                  “Every connection is a step toward your best match.”
                </Typography>
                <Divider sx={{ my: 2, width: '100%' }} />
                <Box width="100%" mb={2}>
                  <Typography variant="caption" color="text.secondary">
                    Improvement Score
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={improvementScore}
                    sx={{
                      height: 8,
                      borderRadius: 2,
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`
                      }
                    }}
                  />
                  <Typography variant="caption" color="success.main">
                    {improvementScore}%
                  </Typography>
                </Box>
                <Chip
                  icon={<EmojiObjectsIcon />}
                  label="Tip: Be proactive!"
                  color="info"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<HelpOutlineIcon />}
                  fullWidth
                  sx={{ mt: 'auto', fontWeight: 600 }}
                >
                  How to improve
                </Button>
              </Paper>
            )}

            {/* Main Feedback Content */}
            <Box flex={1} display="flex" flexDirection="column" gap={3}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <EmojiEventsIcon color="primary" fontSize="large" />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight={800} color="primary">
                  Personalized Feedback
                </Typography>
              </Box>

              <Fade in={true} timeout={500}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e3fcec 80%, #b2f7ef 100%)',
                    borderLeft: `6px solid ${theme.palette.success.main}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={700} color="success.dark">
                      Communication Style
                    </Typography>
                    <Chip label="Important" color="success" size="small" />
                  </Box>
                  {renderRatingStars(feedback.communication.rating)}
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {feedback.communication.text}
                  </Typography>
                  <Typography variant="caption" color="success.dark" fontWeight={600}>
                    {feedback.communication.improvement}
                  </Typography>
                </Paper>
              </Fade>

              <Fade in={true} timeout={800}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #fff5e6 80%, #ffe0b2 100%)',
                    borderLeft: `6px solid ${theme.palette.warning.main}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={700} color="warning.dark">
                      Values Alignment
                    </Typography>
                    <Chip label="Critical" color="warning" size="small" />
                  </Box>
                  {renderRatingStars(feedback.values.rating)}
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {feedback.values.text}
                  </Typography>
                  <Typography variant="caption" color="warning.dark" fontWeight={600}>
                    {feedback.values.improvement}
                  </Typography>
                </Paper>
              </Fade>

              <Fade in={true} timeout={1100}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e3f2fd 80%, #b3e5fc 100%)',
                    borderLeft: `6px solid ${theme.palette.info.main}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={700} color="info.dark">
                      Suggested Improvements
                    </Typography>
                    <Chip label="Actionable" color="info" size="small" />
                  </Box>
                  {renderRatingStars(feedback.suggestions.rating)}
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {feedback.suggestions.text}
                  </Typography>
                  <Typography variant="caption" color="info.dark" fontWeight={600}>
                    {feedback.suggestions.improvement}
                  </Typography>
                </Paper>
              </Fade>

              {isMobile && (
                <Button
                  variant="contained"
                  startIcon={<HelpOutlineIcon />}
                  fullWidth
                  sx={{ mt: 2, fontWeight: 700, background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})` }}
                >
                  Get personalized tips
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Bottom Navigation - Mobile Only */}
      {isMobile && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={bottomNav}
            onChange={(event, newValue) => handleNavigation(newValue)}
            sx={{
              '& .Mui-selected': {
                color: theme.palette.primary.main
              }
            }}
          >
            <BottomNavigationAction label="Matches" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Insights" icon={<FeedbackIcon />} />
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};
