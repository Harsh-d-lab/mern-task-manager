import React, { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { Container, TextField, Button, Typography } from '@mui/material';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addTask({ title, description, status: 'pending' });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Task
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
