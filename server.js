
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ADD task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO tasks (title) VALUES (?)", [title], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Task added");
  });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Task deleted");
  });
});


  

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
