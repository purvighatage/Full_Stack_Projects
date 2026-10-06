// src/components/Freeze/CountdownTimer.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  useEffect(() => {
    if (!endTime) return;

    const calculateTimeLeft = () => {
      const difference = new Date(endTime) - new Date();
      
      if (difference <= 0) {
        return { 
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true 
        };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)) % 24,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isComplete: false
      };
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Set up interval for updates
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [endTime]);

  if (!endTime) {
    return <div className="countdown-timer">No active freeze period</div>;
  }

  if (timeLeft.isComplete) {
    return <div className="countdown-timer">Freeze period complete!</div>;
  }

  return (
    <div className="countdown-timer">
      <span>{String(timeLeft.hours).padStart(2, '0')}h </span>
      <span>{String(timeLeft.minutes).padStart(2, '0')}m </span>
      <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
    </div>
  );
};

CountdownTimer.propTypes = {
  endTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ])
};

CountdownTimer.defaultProps = {
  endTime: null
};