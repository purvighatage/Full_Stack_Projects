// src/components/Profile/ProfileView.js
import React from 'react';

export const ProfileView = ({ user }) => {
  return (
    <div className="profile-view">
      <div className="profile-header">
        <img src={user.profileImage} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
      
      <div className="profile-details">
        <h3>About Me</h3>
        <p>{user.about}</p>
        
        <h3>Compatibility Traits</h3>
        <div className="traits">
          {user.traits.map((trait, index) => (
            <div key={index} className="trait">
              <span>{trait.name}</span>
              <div className="trait-bar">
                <div style={{ width: `${trait.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};