#!/bin/bash

echo "🌟 Breaking Cycles - Starting Application 🌟"
echo ""

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is already running"
else
    echo "🔄 Starting MongoDB..."
    # Try different ways to start MongoDB
    if command -v systemctl &> /dev/null; then
        sudo systemctl start mongod
    elif command -v brew &> /dev/null; then
        brew services start mongodb-community
    else
        echo "⚠️  Please start MongoDB manually:"
        echo "   mongod --dbpath /usr/local/var/mongodb"
    fi
fi

echo ""
echo "🔄 Installing dependencies..."
npm install

echo ""
echo "🚀 Starting Breaking Cycles application..."
echo "📱 Open your browser and go to: http://localhost:3000"
echo "🔑 Test login: test@example.com / password123"
echo ""

npm run dev