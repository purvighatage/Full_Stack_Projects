// Update your src/index.js file:
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>
);