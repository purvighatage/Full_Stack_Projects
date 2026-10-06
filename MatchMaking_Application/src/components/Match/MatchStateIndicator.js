// src/components/Match/MatchStateIndicator.js
export const MatchStateIndicator = ({ state }) => {
  const stateMessages = {
    matched: 'You have a new match!',
    pinned: 'Match pinned - conversation in progress',
    frozen: 'Reflection period - new match in:',
    available: 'Ready for your next match'
  };

  return (
    <div className={`state-indicator ${state}`}>
      <span>{stateMessages[state]}</span>
    </div>
  );
};