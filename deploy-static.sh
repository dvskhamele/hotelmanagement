#!/bin/bash

# HotelOps Static Deployment Script
# This script deploys the static build to a hosting service

echo "🏨 HotelOps Static Deployment Script"
echo "===================================="

# Check if we're in the right directory
BASE_DIR="/Users/test/startups/hotelmanagement/hotel-ops-app"
if [ ! -d "$BASE_DIR" ]; then
    echo "❌ Error: HotelOps directory not found at $BASE_DIR"
    exit 1
fi

cd "$BASE_DIR/frontend"

echo "📍 Working directory: $(pwd)"
echo ""

# Check if required files exist
if [ ! -d "out" ]; then
    echo "❌ Error: Static build directory 'out' not found"
    echo "Building static files..."
    # Temporarily enable export
    echo "/** @type {import('next').NextConfig} */" > temp_config.js
    echo "const nextConfig = {" >> temp_config.js
    echo "  output: 'export'," >> temp_config.js
    echo "};" >> temp_config.js
    echo "module.exports = nextConfig" >> temp_config.js
    
    # Backup current config
    cp next.config.js next.config.js.bak
    
    # Use temp config
    mv temp_config.js next.config.js
    
    # Build
    npm run build
    
    # Restore original config
    mv next.config.js.bak next.config.js
    
    if [ ! -d "out" ]; then
        echo "❌ Error: Failed to build static files"
        exit 1
    fi
fi

echo "✅ Static build found"
echo ""

# Deploy to a static hosting service (example with Surge.sh)
echo "🚀 Deploying static files..."
echo ""

# Check if surge is installed
if ! command -v surge &> /dev/null; then
    echo "Surge.sh is not installed. Installing..."
    npm install -g surge
fi

# Deploy to surge
echo "Deploying to surge.sh..."
surge out hotel-ops.surge.sh

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ HotelOps deployed successfully!"
    echo "Visit: http://hotel-ops.surge.sh"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to deploy HotelOps"
    echo ""
    echo "💡 Troubleshooting tips:"
    echo "  • Check your internet connection"
    echo "  • Verify Surge.sh authentication"
    echo "  • Try deploying to a different domain"
    exit 1
fi