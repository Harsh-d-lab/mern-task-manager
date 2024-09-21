import React, { useContext, useState, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import FilterTasks from './FilterTasks';
import { Container, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const TaskList = () => {
  const { tasks, fetchTasks, deleteTask } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <Container>
      <FilterTasks filter={filter} setFilter={setFilter} />
      <List>
        {filteredTasks.length === 0 ? (
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            No tasks available
          </Typography>
        ) : (
          filteredTasks.map(task => (
            <ListItem key={task._id} alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h6">{task.title}</Typography>}
                secondary={
                  <>
                    <Typography variant="body1">{task.description}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {task.status}
                    </Typography>
                  </>
                }
              />
              <Button variant="contained" color="secondary" onClick={() => deleteTask(task._id)}>
                Delete
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default TaskList;
