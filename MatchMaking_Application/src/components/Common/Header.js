// src/components/Common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="logo">Lone Town</Link>
      <nav>
        <Link to="/match">Matches</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
};