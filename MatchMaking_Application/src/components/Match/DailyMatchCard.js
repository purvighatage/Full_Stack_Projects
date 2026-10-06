// src/components/Match/DailyMatchCard.js
import React from 'react';
import { MatchStateIndicator } from './MatchStateIndicator';
import { PinUnpinActions } from './PinUnpinActions';

export const DailyMatchCard = ({ match, userState }) => {
  return (
    <div className="daily-match-card">
      <MatchStateIndicator state={userState} />
      <div className="match-profile">
        <img src={match.profileImage} alt={match.name} />
        <h3>{match.name}</h3>
        <p>{match.bio}</p>
        <div className="compatibility">
          <span>Compatibility: {match.compatibilityScore}%</span>
        </div>
      </div>
      <PinUnpinActions 
        isPinned={match.isPinned} 
        onPin={() => console.log('Pin action')}
        onUnpin={() => console.log('Unpin action')}
      />
    </div>
  );
};