// src/context/MatchContext.js
import React, { createContext, useState, useEffect } from 'react';

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [userState, setUserState] = useState('available');
  const [freezeEndTime, setFreezeEndTime] = useState(null);

  const pinMatch = () => {
    setUserState('pinned');
    // API call would go here
  };

  const unpinMatch = () => {
    setUserState('frozen');
    setFreezeEndTime(Date.now() + 24 * 60 * 60 * 1000);
    // API call would go here
  };

  useEffect(() => {
    // Simulate fetching a new match
    const fetchMatch = async () => {
      // API call would go here
      setCurrentMatch({
        id: '123',
        name: 'Alex',
        bio: 'Enjoy hiking and reading philosophy',
        profileImage: '...',
        compatibilityScore: 87,
        isPinned: false
      });
      setUserState('matched');
    };

    if (userState === 'available') {
      fetchMatch();
    }
  }, [userState]);

  return (
    <MatchContext.Provider value={{
      currentMatch,
      userState,
      freezeEndTime,
      pinMatch,
      unpinMatch
    }}>
      {children}
    </MatchContext.Provider>
  );
};