@echo off
echo 🌟 Breaking Cycles - Starting Application 🌟
echo.

echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is already running
) else (
    echo 🔄 Starting MongoDB...
    net start MongoDB 2>NUL
    if errorlevel 1 (
        echo ⚠️  Could not start MongoDB service. Please start it manually:
        echo    mongod --dbpath "C:\data\db"
        echo.
    ) else (
        echo ✅ MongoDB started successfully
    )
)

echo.
echo 🔄 Installing dependencies...
call npm install

echo.
echo 🚀 Starting Breaking Cycles application...
echo 📱 Open your browser and go to: http://localhost:3000
echo 🔑 Test login: test@example.com / password123
echo.

call npm run dev