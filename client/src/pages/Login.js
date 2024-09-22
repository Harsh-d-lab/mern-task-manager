import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Container, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, password });
    
    try {
      await login(email, password);
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            console.log('Email changed to:', e.target.value);
            setEmail(e.target.value);
          }}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            console.log('Password changed to:', e.target.value);
            setPassword(e.target.value);
          }}
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
