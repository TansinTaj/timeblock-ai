#!/bin/bash

# TimeBlock AI - Quick Start Script
# Run this to set up and launch your app

echo "🚀 TimeBlock AI - Quick Start"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Make sure you're in the timeblock-ai directory"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully!"
    else
        echo "❌ Installation failed. Please check errors above."
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Starting development server..."
echo "Your app will open at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================"
echo ""

# Start the dev server
npm run dev
