const Task = require('../models/Task');

// Create Task
const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const task = new Task({
            user: req.user._id,
            title,
            description
        });

        await task.save();

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

// Get All Tasks for a User
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Update Task
const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized to update this task' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.json(task);

    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized to delete this task' });
        }

        await task.remove();
        res.json({ message: 'Task removed' });

    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};
