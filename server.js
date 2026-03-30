const express = require("express");
const app = express();

app.use(express.json());

// 📝 Sample Task Data
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build API", completed: false }
];

// 🏠 Home
app.get("/", (req, res) => {
  res.send("📝 Task API Running...");
});


// ======================
// 📝 TASK ROUTES
// ======================

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get single task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// Add new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title;
  task.completed = req.body.completed;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const exists = tasks.some(t => t.id == req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks = tasks.filter(t => t.id != req.params.id);

  res.json({ message: "Task deleted successfully" });
});


// ======================
// 🚀 SERVER
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});