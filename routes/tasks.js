const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = new Task({ user: req.user, title, description, status });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update task
router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
