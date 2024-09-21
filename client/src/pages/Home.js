import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Welcome to the Task Manager App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please
      </Typography>
      <Button component={Link} to="/register" variant="contained" color="primary" style={{ marginRight: '10px' }}>
        Register
      </Button>
      <Button component={Link} to="/login" variant="outlined" color="primary">
        Login
      </Button>
    </Container>
  );
};

export default Home;
