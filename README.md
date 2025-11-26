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
   Navigate to `http://localhost:3000`

## 🎨 Features Overview

### 🏠 **Home Page**
- Inspiring hero section with mission statement
- Quick access to all platform features
- Responsive design for all devices

### 📚 **Learning Platform**
- **Financial Literacy**: Budgeting, saving, investment fundamentals
- **Coding & Tech**: Web development, Python, digital marketing
- **Entrepreneurship**: Business planning, marketing, funding
- **Beauty & Wellness**: Nail artistry, makeup, business setup
- Integration with external platforms (Khan Academy, Coursera)

### 👥 **Community Chat Rooms**
- **Young Mothers Circle**: Support for mothers balancing education and parenting
- **Empowered Abilities**: Resources for women with disabilities
- **Sisters Supporting Sisters**: Main community for all women
- Real-time messaging with Socket.IO
- Online member count and typing indicators

### ✨ **Success Stories**
- Inspirational stories from successful women
- Platform founder's journey
- Community member achievements

### 📞 **Contact & Support**
- Direct contact with platform founder
- Message submission system
- Community support network

## 🔧 **Technical Stack**

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **Vanilla JavaScript** for interactivity
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Responsive Design** for mobile and desktop
- **Socket.IO Client** for real-time features

## 📁 **Project Structure**

```
breaking-cycles/
├── models/
│   ├── User.js          # User schema and model
│   ├── ChatRoom.js      # Chat room schema
│   ├── Message.js       # Message schema
│   ├── Contact.js       # Contact form schema
│   └── Enrollment.js    # Course enrollment schema
├── public/
│   ├── index.html       # Main landing page
│   ├── login.html       # Login page
│   ├── signup.html      # Registration page
│   └── dashboard.html   # User dashboard
├── utils/
│   └── auth.js          # Authentication utilities
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## 🚀 **API Endpoints**

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Chat System
- `GET /api/rooms` - Get all chat rooms
- `GET /api/rooms/:roomName/messages` - Get room messages
- `POST /api/rooms/:roomName/join` - Join a chat room

### Courses
- `POST /api/courses/enroll` - Enroll in a course
- `GET /api/courses/my-courses` - Get user's enrolled courses

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact messages (admin)

## 🔐 **Environment Variables**

Create a `.env` file with:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/breaking_cycles
JWT_SECRET=your-super-secure-jwt-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🎯 **Getting Started - Step by Step**

1. **Ensure MongoDB is running**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start the application**
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Production
   npm start
   ```

5. **Test the application**
   - Visit `http://localhost:3000`
   - Try the test login: `test@example.com` / `password123`
   - Explore chat rooms and course enrollment

## 🧪 **Testing**

### Test User Account
For quick testing, use:
- **Email**: `test@example.com`
- **Password**: `password123`

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Chat room functionality
- [ ] Course enrollment
- [ ] Contact form submission
- [ ] Real-time messaging
- [ ] Mobile responsiveness

## 🚀 **Deployment**

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in production environment

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create breaking-cycles-app

# Set environment variables
heroku config:set MONGODB_URI=your-atlas-connection-string
heroku config:set JWT_SECRET=your-production-jwt-secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩💻 **Author**

**Munana Merveille**
- Email: m.munana@alustudent.com
- Phone: +250791839793
- Location: Kigali, Rwanda
- Institution: African Leadership University (ALU)

## 🙏 **Acknowledgments**

- African Leadership University for educational support
- The amazing women who inspire this platform
- Open source community for the tools and libraries
- All the women breaking cycles every day

## 🔮 **Future Enhancements**

- [ ] Video course integration
- [ ] Progress tracking and certificates
- [ ] Mentorship matching system
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Payment integration for premium courses
- [ ] AI-powered learning recommendations
- [ ] Community events and workshops

---

**"Every woman deserves the chance to rewrite her story and break the cycles that have held her family back for generations."** - Munana Merveille

🌟 **Start your transformation journey today!** 🌟
