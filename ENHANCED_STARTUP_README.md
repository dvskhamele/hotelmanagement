# 🏨 HotelOps Enhanced Startup Script

A beautiful and comprehensive startup script for the Hotel Operations Management System.

## 🚀 Features

- **Beautiful Terminal Interface**: Colorful output with emojis and formatted sections
- **Smart Dependency Management**: Automatically installs missing dependencies
- **Port Management**: Checks port availability and provides warnings
- **Enhanced Backend Information**: Displays available API endpoints and services
- **Professional Logging**: Clear status updates and error handling
- **Graceful Shutdown**: Proper cleanup on termination

## 📋 Usage

### Method 1: Direct Script Execution
```bash
cd /Users/test/startups/hotelmanagement/hotel-ops-app
./hotel-ops-enhanced-start.sh
```

### Method 2: Using npm script
```bash
cd /Users/test/startups/hotelmanagement/hotel-ops-app
npm run enhanced-start
# or
npm run launch
```

## 🔧 What It Does

1. **System Validation**
   - Checks for required tools (Node.js, npm)
   - Validates project structure
   - Verifies working directory

2. **Dependency Management**
   - Installs root dependencies if missing
   - Installs backend dependencies if missing
   - Installs frontend dependencies if missing

3. **Port Checking**
   - Verifies port 3000 (frontend) availability
   - Verifies port 3001 (backend) availability
   - Provides warnings for port conflicts

4. **Backend Enhancement**
   - Displays available API endpoints
   - Shows backend service capabilities
   - Lists core backend functions

5. **Application Launch**
   - Starts both frontend and backend services
   - Monitors application health
   - Provides access URLs
   - Handles graceful shutdown

## 🌐 Access Points

Once started, the application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🛠 Available Backend Services

### Core Services
- **Hotel Service**: Main hotel operations management
- **Room Service**: Room status and management
- **Staff Service**: Employee tracking and management
- **Request Service**: Guest request handling
- **Inventory Service**: Asset and supply tracking
- **Department Service**: Inter-department coordination

### API Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/activity` - Recent activity feed
- `GET /api/rooms` - Room listings
- `PUT /api/rooms/:id/status` - Update room status
- `GET /api/staff` - Staff listings
- `PUT /api/staff/:id/status` - Update staff status
- `GET /api/requests` - Service requests
- `PUT /api/requests/:id/status` - Update request status
- `GET /api/inventory` - Inventory items
- `PUT /api/inventory/:id/quantity` - Update inventory levels
- `GET /api/departments` - Department information

## 🎨 Beautiful Interface Features

- **Color-coded Output**: Different colors for success, warnings, and errors
- **Emoji Support**: Visual indicators for different operations
- **Formatted Sections**: Clear separation of different phases
- **Progress Indicators**: Real-time status updates
- **Professional Headers**: Attractive application branding

## ⚡ Quick Start

Just run:
```bash
npm run launch
```

The script will handle everything automatically!

## 🆘 Troubleshooting

If you encounter issues:

1. **Port Conflicts**: Stop other applications using ports 3000/3001
2. **Dependency Issues**: Run `npm install` manually in each directory
3. **Permission Errors**: Ensure the script is executable (`chmod +x`)
4. **Node.js Missing**: Install from https://nodejs.org/

## 📞 Support

For issues with this script, contact the HotelOps development team.