// src/components/Common/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <Link to="/match" className="menu-item">
          <i className="icon-match"></i>
          <span>Daily Match</span>
        </Link>
        <Link to="/chat" className="menu-item">
          <i className="icon-chat"></i>
          <span>Conversation</span>
        </Link>
        <Link to="/profile" className="menu-item">
          <i className="icon-profile"></i>
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
};