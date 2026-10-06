// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OnboardingPage } from './pages/OnboardingPage';
import { MatchPage } from './pages/MatchPage';
import { ChatPage } from './pages/ChatPage';
import { FreezePage } from './pages/FreezePage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/match" element={<MatchPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/freeze" element={<FreezePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  );
}

export default App;
