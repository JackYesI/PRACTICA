const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Зберігання даних у пам'яті
let users = [];
let teachers = [];
let bookings = [];

// Реєстрація користувача
app.post('/api/register', (req, res) => {
  const { role, username, password, fullName } = req.body;
  if (!role || !username || !password || !fullName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = { id: users.length + 1, role, username, password, fullName };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Вхід користувача
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', user });
});

// Збереження профілю викладача
app.post('/api/teacher', (req, res) => {
  const { displayName, schedule } = req.body;
  if (!displayName || !schedule) {
    return res.status(400).json({ error: 'Display name and schedule are required' });
  }

  teachers.push({ id: teachers.length + 1, displayName, schedule });
  res.status(201).json({ message: 'Profile saved successfully' });
});

// Прослуховування
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
