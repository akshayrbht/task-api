const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/taskdb')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

module.exports = app;