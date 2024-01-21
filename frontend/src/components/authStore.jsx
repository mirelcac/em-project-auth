import { create } from 'zustand';
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';


// Authentication
const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  user: null,
  error: null,

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  clearToken: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  // User Login
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || 'Login failed');
      }
      set({ user: data.response, token: data.response.token, error: null });
      localStorage.setItem('token', data.response.token);
    } catch (error) {
      set({ error: error.message });
    }
  },

  // User registration
  register: async (username, password, email) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || 'Registration failed');
      }
      set({ user: data.response, token: data.response.token, error: null });
      localStorage.setItem('token', data.response.token);
    } catch (error) {
      set({ error: error.message });
    }
  },

  // User Logout
  logout: () => {
    set({ user: null, token: null, error: null });
    localStorage.removeItem('token');
  }
}));

export default useAuthStore;
