# Testing Guide for Breaking Cycles

This guide provides step-by-step instructions for testing the Breaking Cycles application.

## Prerequisites

Before testing, ensure you have:
- Node.js (v14 or higher) installed
- MongoDB installed or Docker available
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file (optional - defaults work for local testing)
# You can change PORT, MONGODB_URI, or JWT_SECRET if needed
```

### 3. Start MongoDB

Choose one of these options:

**Option A: Using Docker (Recommended)**
```bash
docker run -d --name mongodb -p 27017:27017 mongo:7.0
```

**Option B: Using Local MongoDB Installation**
```bash
mongod
```

**Option C: Using MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Update MONGODB_URI in .env file

### 4. Start the Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
✅ Connected to MongoDB
✅ Chat rooms seeded
```

## Testing the Application

### Method 1: Test in Browser

1. **Open the application**
   - Navigate to: http://localhost:3000
   - You should see the Breaking Cycles homepage

2. **Test User Registration**
   - Click on "Get Started" or login button
   - Switch to "Register" tab
   - Fill in the form:
     - Name: Test User
     - Email: test@example.com
     - Password: password123
     - Phone: +1234567890 (optional)
     - Location: Your City (optional)
   - Click "Register"
   - You should receive a success message and be logged in

3. **Test Chat Rooms**
   - After logging in, you'll see 3 chat rooms:
     - Young Mothers Circle 👶
     - Empowered Abilities ♿
     - Sisters Supporting Sisters 🤝
   - Click on any room to join
   - Try sending a message
   - Open another browser tab/window to see real-time chat

4. **Test Course Enrollment**
   - Navigate to the courses section
   - Click "Enroll" on any course
   - Check "My Courses" to see your enrollments

5. **Test Contact Form**
   - Navigate to the contact page
   - Fill in your name, email, subject, and message
   - Submit the form
   - You should see a success message

### Method 2: Test Using API (curl/Postman)

#### Test Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "location": "Test City"
  }'
```

Expected response:
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "avatar": "TE"
  }
}
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get user profile (requires token):**
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Test Chat Rooms

**Get all chat rooms:**
```bash
curl http://localhost:3000/api/rooms
```

Expected response:
```json
{
  "rooms": [
    {
      "_id": "...",
      "name": "Young Mothers Circle",
      "icon": "👶",
      "description": "A supportive space for young mothers.",
      "members": []
    },
    // ... more rooms
  ]
}
```

**Join a room (requires authentication):**
```bash
curl -X POST http://localhost:3000/api/rooms/Young%20Mothers%20Circle/join \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Get room messages:**
```bash
curl http://localhost:3000/api/rooms/Young%20Mothers%20Circle/messages
```

#### Test Contact Form

**Submit contact message:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Question about courses",
    "message": "I would like to know more about the coding courses."
  }'
```

#### Test Course Enrollment

**Enroll in a course (requires authentication):**
```bash
curl -X POST http://localhost:3000/api/courses/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "courseName": "Introduction to Web Development",
    "category": "Coding & Tech"
  }'
```

**Get your enrolled courses:**
```bash
curl http://localhost:3000/api/courses/my-courses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Method 3: Test Real-time Chat with Socket.IO

1. Open two browser windows side by side
2. Navigate to http://localhost:3000 in both
3. Register/login with different accounts in each window
4. Join the same chat room in both windows
5. Send messages from one window
6. Verify messages appear in real-time in the other window
7. Check the online member count updates

## Automated Testing (Optional)

You can also test programmatically using this Node.js script:

```javascript
// test-api.js
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  try {
    // Test registration
    console.log('Testing registration...');
    const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('✅ Registration successful');
    
    const token = registerRes.data.token;
    
    // Test getting rooms
    console.log('\nTesting chat rooms...');
    const roomsRes = await axios.get(`${BASE_URL}/rooms`);
    console.log(`✅ Found ${roomsRes.data.rooms.length} chat rooms`);
    
    // Test enrollment
    console.log('\nTesting course enrollment...');
    const enrollRes = await axios.post(
      `${BASE_URL}/courses/enroll`,
      {
        courseName: 'Introduction to Web Development',
        category: 'Coding & Tech'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('✅ Course enrollment successful');
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();
```

Run with:
```bash
node test-api.js
```

## Troubleshooting

### Server won't start
- **Check MongoDB is running**: `docker ps` or `mongod` status
- **Check port 3000 is available**: `lsof -i :3000` or `netstat -an | grep 3000`
- **Check dependencies are installed**: `npm install`

### Can't connect to MongoDB
- **Using Docker**: Ensure container is running: `docker ps`
- **Using local MongoDB**: Ensure mongod service is running
- **Check connection string**: Verify MONGODB_URI in .env file

### Authentication errors
- **Invalid token**: Token may have expired (7 days). Register/login again
- **Missing Authorization header**: Ensure you're passing `Bearer YOUR_TOKEN`

### Socket.IO not working
- **Check browser console** for connection errors
- **Firewall**: Ensure port 3000 is not blocked
- **CORS**: If accessing from different origin, check CORS settings

## What to Look For

### ✅ Successful Indicators
- Server starts without errors
- MongoDB connection successful message
- Chat rooms seeded message appears
- API endpoints return proper JSON responses
- Real-time messages appear in chat
- User can register, login, and access protected routes

### ❌ Error Indicators
- Module not found errors (models should be capitalized)
- MongoDB connection timeout
- 401 Unauthorized for protected routes
- 500 Internal Server Error responses

## Need Help?

If you encounter issues:
1. Check the server console for error messages
2. Check browser console (F12) for JavaScript errors
3. Verify all prerequisites are installed
4. Ensure MongoDB is running
5. Try restarting the server

## Clean Up

When done testing:

```bash
# Stop the server: Press Ctrl+C in terminal

# Stop MongoDB Docker container (if using Docker)
docker stop mongodb
docker rm mongodb

# Or stop local MongoDB service
# (depends on your OS and installation method)
```
