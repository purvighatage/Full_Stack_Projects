// src/components/Profile/EditProfileForm.js
import React, { useState } from 'react';
import { Button } from '../Common/Button';

export const EditProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    about: user.about
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      
      <label>
        Bio:
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </label>
      
      <label>
        About Me:
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
        />
      </label>
      
      <Button type="submit">Save Changes</Button>
    </form>
  );
};