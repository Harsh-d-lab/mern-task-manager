import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${API_URL}/me`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Send the token in the header
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setError(null);
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { username, email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setError(null);
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
