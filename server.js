const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  db.run("INSERT INTO todos (task, done) VALUES (?, 0)", [task], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, task, done: 0 });
  });
});

// Toggle todo done
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run("UPDATE todos SET done = NOT done WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));