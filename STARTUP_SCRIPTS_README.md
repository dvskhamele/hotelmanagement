# HotelOps Startup Scripts

This directory contains scripts to help you start the HotelOps application.

## Available Scripts

### 1. `auto-start.sh`
A comprehensive script that:
- Checks for required dependencies
- Installs any missing dependencies
- Starts the development server
- Runs both frontend and backend components

**Usage:**
```bash
./auto-start.sh
```

### 2. `hotel-ops-launcher.sh`
A simple launcher that opens the application in your default browser without starting a server.

**Usage:**
```bash
./hotel-ops-launcher.sh
```

## Prerequisites

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)

## Quick Start

1. Make sure you're in the hotel-ops-app directory:
   ```bash
   cd /Users/test/startups/hotelmanagement/hotel-ops-app
   ```

2. For development with live reloading:
   ```bash
   ./auto-start.sh
   ```

3. To simply open the application in your browser:
   ```bash
   ./hotel-ops-launcher.sh
   ```

## Troubleshooting

If you encounter any issues:

1. Make sure all scripts are executable:
   ```bash
   chmod +x *.sh
   ```

2. Check that Node.js is installed:
   ```bash
   node --version
   npm --version
   ```

3. If dependencies are missing, the auto-start script will attempt to install them automatically.

## Application Access

Once started, the application will be available at:
- http://localhost:3000 (when using auto-start.sh)
- File system path (when using hotel-ops-launcher.sh)