#!/bin/bash

# Contact List Application Startup Script
echo "🚀 Starting Contact List Application..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "🔥 Starting development server..."
echo "📱 Open your browser to: http://localhost:5173"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev
