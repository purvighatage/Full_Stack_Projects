import { createContext, useState, useEffect } from 'react';
import { fetchBooks, fetchBookById, fetchFeaturedBooks as apiFetchFeaturedBooks } from '../services/api';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [state, setState] = useState({
    books: [],
    featuredBooks: [],
    loading: true,
    error: null
  });

  const fetchFeaturedBooks = async () => {
  setState(prev => ({ ...prev, loading: true }));

  try {
    const data = await apiFetchFeaturedBooks();

    if (Array.isArray(data) && data.length > 0) {
      // Valid data, update normally
      setState(prev => ({
        ...prev,
        featuredBooks: data,
        loading: false,
        error: null
      }));
    } else {
      // Empty data, treat as soft error (fallback to demo data)
      console.warn("API returned no featured books. Falling back to demo data.");
      setState(prev => ({
        ...prev,
        featuredBooks: [], // Keep it empty so fallback happens in UI
        loading: false,
        error: null // No hard error
      }));
    }

  } catch (error) {
    setState(prev => ({
      ...prev,
      error: error.message || "Failed to fetch books",
      loading: false
    }));
  }
};

  const loadBooks = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const data = await fetchBooks();
      setState(prev => ({
        ...prev,
        books: data,
        loading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([loadBooks(), fetchFeaturedBooks()]);
    };
    initializeData();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        featuredBooks: state.featuredBooks,
        loading: state.loading,
        error: state.error,
        fetchFeaturedBooks,
        loadBooks
      }}
    >
      {children}
    </BookContext.Provider>
  );
};