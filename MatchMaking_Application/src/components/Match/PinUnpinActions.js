// src/components/Match/PinUnpinActions.js
import React from 'react';
import { Button } from '../Common/Button';

export const PinUnpinActions = ({ isPinned, onPin, onUnpin }) => {
  return (
    <div className="pin-actions">
      {isPinned ? (
        <Button variant="danger" onClick={onUnpin}>
          Unpin Match
        </Button>
      ) : (
        <Button variant="primary" onClick={onPin}>
          Pin Match
        </Button>
      )}
    </div>
  );
};