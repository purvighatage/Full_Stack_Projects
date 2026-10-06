import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import BookPage from './pages/BookPage';
import JoinCommunityPage from './pages/JoinCommunityPage'; // Adjust path if different

import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // You'll need to create this

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        <Container 
          component="main" 
          maxWidth="lg" 
          sx={{ 
            flex: 1, 
            py: 3,
            mt: 2
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/join-community" element={<JoinCommunityPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              {/* Add other protected routes here when ready */}
              {/* <Route path="/books/:id/review" element={<ReviewFormPage />} />
              <Route path="/my-reviews" element={<UserReviewsPage />} /> */}
            </Route>

            {/* Admin Routes (uncomment when ready) */}
            {/* <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/add-book" element={<AddBookPage />} />
            </Route> */}
          </Routes>
        </Container>
        
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;