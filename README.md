# Breaking Cycles 🌟

**Empowering Women Through Education**

A platform dedicated to breaking the cycle of poverty among women through education, community support, and skill development.

## 🎯 Features

- **Educational Resources**: Access courses in financial literacy, coding, entrepreneurship, and beauty services
- **Community Support**: Join supportive chat rooms for young mothers, women with disabilities, and more
- **Real-time Chat**: Connect with other women on their empowerment journey
- **Success Stories**: Get inspired by stories of transformation
- **Progress Tracking**: Monitor your learning journey

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Community Edition)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/breaking-cycles.git
   cd breaking-cycles
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env
   # Edit .env with your configuration
```

4. **Start MongoDB**
```bash
   mongod
```

5. **Run the application**
```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
```

6. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 🧪 Testing

For detailed testing instructions, see **[TESTING.md](./TESTING.md)**

Quick test:
```bash
# Test the API is working
curl http://localhost:3000/api/rooms
```

## 📚 Documentation

- [Testing Guide](./TESTING.md) - Complete guide for testing all features
- [API Documentation](#api-endpoints) - See below for API reference

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/me` - Get current user (requires auth)

### Chat Rooms
- `GET /api/rooms` - Get all chat rooms
- `POST /api/rooms/:roomName/join` - Join a chat room (requires auth)
- `GET /api/rooms/:roomName/messages` - Get room messages

### Courses
- `POST /api/courses/enroll` - Enroll in a course (requires auth)
- `GET /api/courses/my-courses` - Get user's enrolled courses (requires auth)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact messages

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT & bcrypt
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

## 📁 Project Structure

```
breaking-cycles/
├── models/           # Database models
│   ├── User.js
│   ├── ChatRoom.js
│   ├── Message.js
│   ├── Contact.js
│   └── Enrollment.js
├── utils/            # Utility functions
│   └── auth.js
├── public/           # Static files
│   └── index.html
├── server.js         # Main server file
├── package.json
├── .env.example      # Environment variables template
└── TESTING.md        # Testing guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Munana Merveille - [m.munana@alustudent.com](mailto:m.munana@alustudent.com)
