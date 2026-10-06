// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ correct for React 18+
import './styles/global.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MatchProvider } from './context/MatchContext';
import { BrowserRouter } from 'react-router-dom'; // ✅ import this

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App with BrowserRouter */}
      <AuthProvider>
        <MatchProvider>
          <App />
        </MatchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
