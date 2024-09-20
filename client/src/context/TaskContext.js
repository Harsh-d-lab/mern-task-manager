// src/context/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('/api/tasks', {
          headers: { 'x-auth-token': token },
        });
        setTasks(res.data);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const token = localStorage.getItem('token');
    const res = await axios.post('/api/tasks', task, {
      headers: { 'x-auth-token': token },
    });
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (id, updatedTask) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`/api/tasks/${id}`, updatedTask, {
      headers: { 'x-auth-token': token },
    });
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/tasks/${id}`, {
      headers: { 'x-auth-token': token },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
