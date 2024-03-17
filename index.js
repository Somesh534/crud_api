require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database
let users = [];

// Routes
app.get("/users", (req, res) => {
  res.json(users);
//   console.log("Home Page");
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    return res.status(400).json({ error: "Username and age are required" });
  }
  const newUser = { id: uuidv4(), username, age, hobbies: hobbies || [] };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[index] = { ...users[index], username, age, hobbies: hobbies || [] };
  res.json(users[index]);
});

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  users = users.filter((u) => u.id !== userId);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to generate UUID (v4)
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
