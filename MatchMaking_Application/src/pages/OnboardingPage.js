// src/pages/OnboardingPage.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Fade,
  AppBar,
  Toolbar,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Feedback as FeedbackIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: "How do you handle conflict in relationships?",
    options: [
      { value: "avoid", label: "I prefer to avoid conflict" },
      { value: "discuss", label: "I try to discuss issues calmly" },
      { value: "emotional", label: "I tend to get emotional" },
      { value: "compromise", label: "I look for compromises" }
    ]
  },
  {
    id: 2,
    text: "What's most important in a relationship?",
    options: [
      { value: "trust", label: "Trust and honesty" },
      { value: "communication", label: "Good communication" },
      { value: "passion", label: "Passion and chemistry" },
      { value: "growth", label: "Personal growth together" }
    ]
  },
  {
    id: 3,
    text: "How do you prefer to spend your free time?",
    options: [
      { value: "active", label: "Active outdoor activities" },
      { value: "social", label: "Socializing with friends" },
      { value: "quiet", label: "Quiet time alone" },
      { value: "creative", label: "Creative pursuits" }
    ]
  }
];

export const OnboardingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFade, setShowFade] = useState(true);
  const [bottomNav, setBottomNav] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  // Calculate progress
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    setProgress(Math.round((answeredCount / totalQuestions) * 100));
  }, [answers, totalQuestions]);

  // Simulate timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft(
        `${String(now.getHours()).padStart(2, '0')}:` +
        `${String(now.getMinutes()).padStart(2, '0')}:` +
        `${String(now.getSeconds()).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    setShowFade(false);
    setTimeout(() => {
      setCurrentQuestionIndex(prev => Math.min(prev + 1, totalQuestions - 1));
      setShowFade(true);
    }, 250);
  };

  const handlePrevious = () => {
    setShowFade(false);
    setTimeout(() => {
      setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
      setShowFade(true);
    }, 250);
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
    navigate('/match');
  };

  const getStepColor = (index) => {
    if (index < currentQuestionIndex) return 'success';
    if (index === currentQuestionIndex) return 'primary';
    return 'disabled';
  };

  return (
    <Box sx={{
      bgcolor: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
      minHeight: '100vh',
      pb: 7 // Bottom navigation offset
    }}>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              mr: 2,
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
            Lone Town
          </Typography>
          <Chip
            label="Onboarding"
            color="primary"
            size="small"
            variant="outlined"
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 2 }}>
        <Paper elevation={isMobile ? 0 : 3} sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 3,
          bgcolor: isMobile ? 'transparent' : 'background.paper'
        }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {/* Profile Sidebar */}
            {!isMobile && (
              <Paper elevation={3} sx={{
                minWidth: 240,
                bgcolor: theme.palette.primary.light,
                borderRadius: 3,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'sticky',
                top: 20
              }}>
                <Avatar sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  bgcolor: theme.palette.primary.main,
                  boxShadow: 3
                }}>
                  <PersonIcon sx={{ fontSize: 48 }} />
                </Avatar>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Your Profile
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                  "Building meaningful connections"
                </Typography>

                <Box sx={{ width: '100%', mb: 3 }}>
                  <Typography variant="caption" color="text.secondary">
                    Onboarding Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 2,
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {Object.keys(answers).length}/{totalQuestions} completed
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
                  Time Spent: <strong>{timeLeft}</strong>
                </Typography>
              </Paper>
            )}

            {/* Questionnaire */}
            <Box flex={1} display="flex" flexDirection="column" alignItems="center">
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight={700}
                mb={2}
                sx={{ textAlign: 'center', color: theme.palette.primary.dark }}
              >
                {isMobile ? 'Get Started' : "Let's Get to Know You"}
              </Typography>

              <Stepper
                activeStep={currentQuestionIndex}
                alternativeLabel
                sx={{ width: '100%', mb: 3 }}
              >
                {questions.map((q, index) => (
                  <Step key={q.id}>
                    <StepLabel
                      StepIconProps={{
                        color: getStepColor(index)
                      }}
                    />
                  </Step>
                ))}
              </Stepper>

              <Fade in={showFade} timeout={300}>
                <Box style={{ width: '100%', maxWidth: 600 }}>
                  <Card elevation={4} sx={{
                    width: '100%',
                    mb: 2,
                    borderLeft: `6px solid ${theme.palette.primary.main}`,
                    background: `linear-gradient(90deg, ${theme.palette.background.paper} 80%, ${theme.palette.primary.light} 100%)`
                  }}>
                    <CardContent>
                      <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
                        {currentQuestion.text}
                      </Typography>
                      <RadioGroup
                        value={currentAnswer || ''}
                        onChange={e => handleAnswer(currentQuestion.id, e.target.value)}
                      >
                        {currentQuestion.options.map(opt => (
                          <FormControlLabel
                            key={opt.value}
                            value={opt.value}
                            control={<Radio sx={{ display: 'none' }} />}
                            label={
                              <Box
                                sx={{
                                  p: 2,
                                  borderRadius: 2,
                                  boxShadow: currentAnswer === opt.value ? 4 : 1,
                                  bgcolor: currentAnswer === opt.value
                                    ? theme.palette.primary.light
                                    : theme.palette.background.paper,
                                  color: currentAnswer === opt.value
                                    ? theme.palette.primary.contrastText
                                    : theme.palette.text.primary,
                                  border: currentAnswer === opt.value
                                    ? `2px solid ${theme.palette.primary.main}`
                                    : `1px solid ${theme.palette.divider}`,
                                  transition: 'all 0.2s',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    boxShadow: 6,
                                    bgcolor: theme.palette.action.hover
                                  }
                                }}
                              >
                                <FavoriteIcon
                                  color={currentAnswer === opt.value ? 'primary' : 'disabled'}
                                  sx={{ mr: 1 }}
                                />
                                <Typography variant="body1">{opt.label}</Typography>
                              </Box>
                            }
                            sx={{
                              mb: 2,
                              width: '100%',
                              margin: 0
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </Box>
              </Fade>

              <Box display="flex" gap={2} mt={2} width="100%" justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  startIcon={<ArrowBackIcon />}
                  sx={{ minWidth: 120, fontWeight: 600 }}
                >
                  Previous
                </Button>
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      minWidth: 120,
                      fontWeight: 600,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={!currentAnswer}
                    startIcon={<CheckCircleIcon />}
                    sx={{
                      minWidth: 150,
                      fontWeight: 600,
                      background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`
                    }}
                  >
                    Complete Profile
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Bottom Navigation - Mobile */}
      {isMobile && (
        <Paper sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar
        }} elevation={3}>
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
            sx={{
              '& .Mui-selected': {
                color: theme.palette.primary.main
              }
            }}
          >
            <BottomNavigationAction
              label="Questions"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              label="Matches"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              label="Feedback"
              icon={<FeedbackIcon />}
            />
            <BottomNavigationAction
              label="Profile"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};
