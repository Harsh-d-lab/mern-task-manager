import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const API_URL = 'http://localhost:5000/api/tasks';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTasks(res.data);
          setLoading(false);
        } catch (error) {
          setError(error.response ? error.response.data : error.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.post(API_URL, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks((prevTasks) => [...prevTasks, res.data]);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    }
  };

  // Update an existing task
  const updateTask = async (id, updatedTask) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.put(`${API_URL}/${id}`, updatedTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? res.data : task))
        );
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;