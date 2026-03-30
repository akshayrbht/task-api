const Task = require('../models/Task');

// GET all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST create task
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        const saved = await task.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT update task
exports.updateTask = async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updated);

    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

// DELETE task
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted" });

    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
};