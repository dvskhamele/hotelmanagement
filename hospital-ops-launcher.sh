#!/bin/bash

# HospitalOps Simple Launcher Script
# This script opens the HospitalOps application in the default browser

echo "🏥 SuperHealth Launcher"
echo "======================="

# Define the base directory
BASE_DIR="/Users/test/startups/hospitalmanagement/hospital-ops-app"

# Check if the directory exists
if [ ! -d "$BASE_DIR" ]; then
    echo "❌ Error: SuperHealth directory not found at $BASE_DIR"
    exit 1
fi

# Change to the application directory
cd "$BASE_DIR"

echo "📍 Working directory: $(pwd)"

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found"
    exit 1
fi

# Determine the URL to open
# For macOS, we can use the 'open' command
# For Linux, we would use 'xdg-open'
# For Windows, we would use 'start'

echo "🚀 Opening SuperHealth application..."

# Try to open in the default browser
if command -v open &> /dev/null; then
    # macOS
    open "index.html"
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open "index.html"
elif command -v cmd &> /dev/null; then
    # Windows
    cmd /c start index.html
else
    # Fallback - try to determine the absolute path and echo it
    ABSOLUTE_PATH="$(pwd)/index.html"
    echo "⚠️  Could not automatically open browser"
    echo "📄 Please open the following file in your browser:"
    echo "   $ABSOLUTE_PATH"
    echo ""
    echo "📋 Or copy and paste this URL in your browser:"
    echo "   file://$ABSOLUTE_PATH"
    exit 1
fi

echo "✅ SuperHealth application opened in your default browser!"
echo "If it didn't open, please manually open the file:"
echo "   file://$(pwd)/index.html"