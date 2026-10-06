// src/components/Chat/MessageCounter.js
export const MessageCounter = ({ current }) => {
  const percentage = (current / 100) * 100;
  
  return (
    <div className="message-counter">
      <h4>Progress to video call unlock</h4>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
      <span>{current}/100 messages</span>
    </div>
  );
};