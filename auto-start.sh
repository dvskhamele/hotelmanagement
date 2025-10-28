#!/bin/bash

# HotelOps Auto-Start Script
# This script starts the HotelOps application in development mode

echo "🏨 HotelOps Auto-Start Script"
echo "=============================="

# Check if we're in the right directory
BASE_DIR="/Users/test/startups/hotelmanagement/hotel-ops-app"
if [ ! -d "$BASE_DIR" ]; then
    echo "❌ Error: HotelOps directory not found at $BASE_DIR"
    exit 1
fi

cd "$BASE_DIR"

echo "📍 Working directory: $(pwd)"

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

# Check if backend directory exists
if [ -d "backend" ]; then
    echo "🔧 Backend directory found"
    if [ ! -d "backend/node_modules" ]; then
        echo "📦 Installing backend dependencies..."
        cd backend
        npm install
        if [ $? -ne 0 ]; then
            echo "❌ Error: Failed to install backend dependencies"
            exit 1
        fi
        echo "✅ Backend dependencies installed successfully"
        cd ..
    fi
else
    echo "⚠️  Backend directory not found"
fi

echo ""

# Check if frontend directory exists
if [ -d "frontend" ]; then
    echo "🎨 Frontend directory found"
    if [ ! -d "frontend/node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        cd frontend
        npm install
        if [ $? -ne 0 ]; then
            echo "❌ Error: Failed to install frontend dependencies"
            exit 1
        fi
        echo "✅ Frontend dependencies installed successfully"
        cd ..
    fi
else
    echo "⚠️  Frontend directory not found"
fi

echo ""
echo "🔍 Checking port availability..."

# Check if ports 3000 and 3001 are already in use
FRONTEND_CONFLICT=false
BACKEND_CONFLICT=false

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Warning: Port 3000 is already in use"
    echo "   This may cause issues with the frontend..."
    FRONTEND_CONFLICT=true
    echo ""
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Warning: Port 3001 is already in use"
    echo "   This may cause issues with the backend..."
    BACKEND_CONFLICT=true
    echo ""
fi

if [ "$FRONTEND_CONFLICT" = true ] || [ "$BACKEND_CONFLICT" = true ]; then
    echo "💡 Tip: Consider stopping other applications or using different ports"
    echo "         You can stop processes using these ports with:"
    echo "         sudo lsof -ti:3000 | xargs kill -9  # Kill frontend processes"
    echo "         sudo lsof -ti:3001 | xargs kill -9  # Kill backend processes"
    echo ""
    echo "         Or manually stop the conflicting applications."
    echo ""
fi

echo "🔧 Configuring application ports..."
echo "   • Frontend: http://localhost:3000"
echo "   • Backend: http://localhost:3001"
echo ""

echo "🚀 Starting HotelOps application..."
if [ "$FRONTEND_CONFLICT" = true ] || [ "$BACKEND_CONFLICT" = true ]; then
    echo "⚠️  Warning: Port conflicts detected, application may not start correctly"
fi
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

# Set environment variables for proper port configuration
echo "🔧 Setting environment variables..."
export PORT=3001
export NODE_ENV=development

# Start the development server
npm run dev

if [ $? -eq 0 ]; then
    echo "✅ HotelOps application started successfully!"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:3001"
else
    echo "❌ Error: Failed to start HotelOps application"
    if [ "$FRONTEND_CONFLICT" = true ] || [ "$BACKEND_CONFLICT" = true ]; then
        echo "💡 Try stopping the conflicting applications and running this script again."
    fi
    exit 1
fi