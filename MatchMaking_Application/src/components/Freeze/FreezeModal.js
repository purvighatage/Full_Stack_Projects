// src/components/Freeze/FreezeModal.js
import React from 'react';
import { CountdownTimer } from './CountdownTimer';

export const FreezeModal = ({ freezeEndTime }) => {
  return (
    <div className="freeze-modal">
      <h3>Reflection Period</h3>
      <p>You've chosen to unpin your match. Take this time to reflect on what you're looking for.</p>
      <p>Your next match will be available in:</p>
      <CountdownTimer endTime={freezeEndTime} />
      <p>We'll use this time to find you a better match based on your feedback.</p>
    </div>
  );
};