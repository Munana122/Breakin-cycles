require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

// Import Models
const User = require('./models/user');
const ChatRoom = require('./models/chatroom');
const Message = require('./models/message');
const Contact = require('./models/contact');
const Enrollment = require('./models/enrollment');

// Import Auth Utilities
const { hashPassword, comparePassword, generateToken, verifyToken } = require('./utils/auth');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/breaking_cycles';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedInitialData();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== AUTH ROUTES ====================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await hashPassword(password);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      avatar: name.substring(0, 2).toUpperCase()
    });
    
    await user.save();
    
    const token = generateToken(user._id);
    
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    user.lastActive = new Date();
    await user.save();
    
    const token = generateToken(user._id);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        joinedRooms: user.joinedRooms
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      phone: req.user.phone,
      location: req.user.location,
      joinedRooms: req.user.joinedRooms
    }
  });
});

// ==================== CHAT ROUTES ====================

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await ChatRoom.find().populate('members', 'name avatar');
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/rooms/:roomName/messages', async (req, res) => {
  try {
    const { roomName } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    
    const messages = await Message.find({ roomName })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'name avatar');
    
    res.json({ messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms/:roomName/join', authMiddleware, async (req, res) => {
  try {
    const { roomName } = req.params;
    
    const room = await ChatRoom.findOne({ name: roomName });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (!room.members.includes(req.userId)) {
      room.members.push(req.userId);
      await room.save();
    }
    
    if (!req.user.joinedRooms.includes(roomName)) {
      req.user.joinedRooms.push(roomName);
      await req.user.save();
    }
    
    res.json({ message: 'Joined room successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== CONTACT ROUTES ====================

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== COURSE ROUTES ====================

app.post('/api/courses/enroll', authMiddleware, async (req, res) => {
  try {
    const { courseName, category } = req.body;
    
    const existing = await Enrollment.findOne({
      userId: req.userId,
      courseName
    });
    
    if (existing) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }
    
    const enrollment = new Enrollment({
      userId: req.userId,
      courseName,
      category
    });
    
    await enrollment.save();
    
    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/my-courses', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.userId })
      .sort({ enrolledAt: -1 });
    
    res.json({ enrollments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SOCKET.IO ====================

io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);
  
  socket.on('join-room', async (data) => {
    const { roomName, userId, userName, userAvatar } = data;
    
    socket.join(roomName);
    console.log(`👥 ${userName} joined ${roomName}`);
    
    socket.to(roomName).emit('user-joined', {
      userName,
      userAvatar,
      timestamp: new Date()
    });
    
    const roomSockets = await io.in(roomName).allSockets();
    io.to(roomName).emit('online-count', roomSockets.size);
  });
  
  socket.on('send-message', async (data) => {
    const { roomName, userId, author, avatar, text } = data;
    
    try {
      const message = new Message({
        roomName,
        userId,
        author,
        avatar,
        text
      });
      
      await message.save();
      
      const messageData = {
        id: message._id,
        author,
        avatar,
        text,
        time: 'Just now',
        timestamp: message.createdAt
      };
      
      io.to(roomName).emit('new-message', messageData);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('message-error', { error: 'Failed to send message' });
    }
  });
  
  socket.on('leave-room', async (data) => {
    const { roomName, userName } = data;
    
    socket.leave(roomName);
    console.log(`👋 ${userName} left ${roomName}`);
    
    const roomSockets = await io.in(roomName).allSockets();
    io.to(roomName).emit('online-count', roomSockets.size);
  });
  
  socket.on('typing', (data) => {
    socket.to(data.roomName).emit('user-typing', {
      userName: data.userName,
      isTyping: data.isTyping
    });
  });
  
  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });
});

// ==================== SEED DATA ====================

async function seedInitialData() {
  try {
    const roomCount = await ChatRoom.countDocuments();
    if (roomCount > 0) {
      console.log('📊 Data already seeded');
      return;
    }
    
    const rooms = [
      {
        name: 'Young Mothers Circle',
        icon: '👶',
        description: 'A supportive space for young mothers.',
        members: []
      },
      {
        name: 'Empowered Abilities',
        icon: '♿',
        description: 'Celebrating abilities and creating opportunities.',
        members: []
      },
      {
        name: 'Sisters Supporting Sisters',
        icon: '🤝',
        description: 'Main community for women breaking cycles.',
        members: []
      }
    ];
    
    await ChatRoom.insertMany(rooms);
    console.log('✅ Chat rooms seeded');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
  }
}

// ==================== START SERVER ====================

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = { app, io };
