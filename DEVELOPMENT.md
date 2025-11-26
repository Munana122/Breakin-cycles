# Development Guide 🛠️

## Quick Start

### Windows Users
```bash
# Double-click start.bat or run:
start.bat
```

### macOS/Linux Users
```bash
# Make executable and run:
chmod +x start.sh
./start.sh
```

### Manual Setup
```bash
# 1. Start MongoDB
mongod

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

## Development Workflow

### File Structure
- `server.js` - Main server file with all API routes
- `models/` - MongoDB schemas (User, ChatRoom, Message, etc.)
- `public/` - Frontend files (HTML, CSS, JS)
- `utils/` - Helper functions (authentication)

### Key Features to Test

1. **User Authentication**
   - Registration: Create new account
   - Login: Use test@example.com / password123
   - JWT token handling

2. **Chat System**
   - Join different chat rooms
   - Send real-time messages
   - See online member count

3. **Course Enrollment**
   - Browse course categories
   - Enroll in courses
   - Track enrolled courses

4. **Contact System**
   - Submit contact forms
   - View submitted messages (admin)

### API Testing

Use tools like Postman or curl:

```bash
# Register new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get chat rooms
curl http://localhost:3000/api/rooms
```

### Database Management

```bash
# Connect to MongoDB
mongo breaking_cycles

# View collections
show collections

# View users
db.users.find().pretty()

# View messages
db.messages.find().pretty()

# Clear all data (reset)
db.dropDatabase()
```

### Socket.IO Events

The application uses these real-time events:
- `join-room` - User joins a chat room
- `send-message` - User sends a message
- `new-message` - Broadcast new message
- `user-joined` - Notify when user joins
- `typing` - Show typing indicators
- `online-count` - Update online member count

### Environment Variables

Required in `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/breaking_cycles
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Common Issues & Solutions

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process: `npx kill-port 3000`

3. **JWT Token Issues**
   - Clear browser localStorage
   - Generate new JWT_SECRET

4. **Chat Not Working**
   - Check browser console for errors
   - Ensure Socket.IO is connected
   - Verify chat-styles.css is loaded

### Adding New Features

1. **New API Route**
   ```javascript
   app.get('/api/new-route', authMiddleware, async (req, res) => {
     // Your logic here
   });
   ```

2. **New Database Model**
   ```javascript
   // models/NewModel.js
   const mongoose = require('mongoose');
   
   const newSchema = new mongoose.Schema({
     // Define your schema
   });
   
   module.exports = mongoose.model('NewModel', newSchema);
   ```

3. **New Socket Event**
   ```javascript
   socket.on('new-event', (data) => {
     // Handle the event
     io.to(roomName).emit('response-event', responseData);
   });
   ```

### Deployment Checklist

- [ ] Update MONGODB_URI for production
- [ ] Set strong JWT_SECRET
- [ ] Configure CORS for production domain
- [ ] Set NODE_ENV=production
- [ ] Test all features in production environment
- [ ] Set up monitoring and logging

### Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit: `git commit -m "Add feature description"`
5. Push: `git push origin feature-name`
6. Create Pull Request

### Support

For development questions:
- Email: m.munana@alustudent.com
- Check existing issues in the repository
- Review the main README.md for additional information