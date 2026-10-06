import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Request interceptor for auth tokens
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Book endpoints
export const fetchBooks = async (params = {}) => {
  const response = await API.get('/books', { params });
  return {
    data: response.data.books,
    total: response.data.totalCount,
  };
};

export const fetchBookById = async (id) => {
  const response = await API.get(`/books/${id}`);
  return response.data;
};

export const fetchFeaturedBooks = async () => {
  const response = await API.get('/books/featured');
  return response.data;
};

// Review endpoints
export const fetchReviewsByBookId = async (bookId) => {
  const response = await API.get(`/books/${bookId}/reviews`);
  return response.data;
};

export const submitReview = async (bookId, reviewData) => {
  const response = await API.post(`/books/${bookId}/reviews`, reviewData);
  return response.data;
};

// User endpoints
export const getUserProfile = async () => {
  const response = await API.get('/users/me');
  return response.data;
};

// Auth endpoints
export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};