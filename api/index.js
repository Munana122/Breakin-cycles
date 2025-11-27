const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Mock auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const username = email.split('@')[0];
  res.json({
    message: 'Login successful',
    token: 'mock-token',
    user: {
      id: 'mock-user',
      name: `Hey ${username}`,
      email: email,
      avatar: username.substring(0, 2).toUpperCase()
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: 'Registration successful',
    user: { name, email, avatar: name.substring(0, 2).toUpperCase() }
  });
});

app.get('/api/rooms', (req, res) => {
  res.json({
    rooms: [
      { name: 'Young Mothers Circle', icon: '👶', members: [] },
      { name: 'Empowered Abilities', icon: '♿', members: [] },
      { name: 'Sisters Supporting Sisters', icon: '🤝', members: [] }
    ]
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;