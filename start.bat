@echo off
REM TimeBlock AI - Quick Start Script (Windows)
REM Double-click this file to set up and launch your app

echo.
echo 🚀 TimeBlock AI - Quick Start
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

node --version
echo ✅ Node.js found
echo.

REM Check if in correct directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo Make sure you're in the timeblock-ai directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    
    if %ERRORLEVEL% equ 0 (
        echo ✅ Dependencies installed successfully!
    ) else (
        echo ❌ Installation failed. Please check errors above.
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies already installed
)

echo.
echo 🎉 Setup complete!
echo.
echo Starting development server...
echo Your app will open at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ================================
echo.

REM Start the dev server
call npm run dev

pause
