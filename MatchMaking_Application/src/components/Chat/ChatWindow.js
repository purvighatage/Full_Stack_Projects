// src/components/Chat/ChatWindow.js
import React, { useState } from 'react';
import { MessageCounter } from './MessageCounter';
import { VideoCallUnlock } from './VideoCallUnlock';

export const ChatWindow = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <MessageCounter current={messages.length} />
      
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            <span>{msg.time}</span>
          </div>
        ))}
      </div>
      
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      
      <VideoCallUnlock unlocked={messages.length >= 100} />
    </div>
  );
};