# Hotel Operations Management System - Development Guide

## Running the Application

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Starting the Application

To run both the frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- Backend server on port 3001
- Frontend development server on port 3000

### Running Components Separately

To run only the backend:

```bash
npm run dev:backend
```

To run only the frontend:

```bash
npm run dev:frontend
```

## Development Modes

### Mock Mode (Default)
The application is designed to work in mock mode by default, which means it will function even without a backend server running. In this mode:
- All data is simulated
- API calls return mock data
- No database connections are required
- Perfect for frontend development and demonstrations

### Real Backend Mode
When the backend server is running, the application will automatically connect to it and use real data.

## API Endpoints

All API endpoints are available at `/api/*` and are automatically proxied to the backend server.

## Authentication

For development purposes, you can log in with any email and password. The system will create a user session automatically.

## Folder Structure

```
hotel-ops-app/
├── backend/          # Backend server (Node.js/Express)
├── frontend/         # Frontend application (Next.js/React)
├── package.json      # Root package.json with convenience scripts
```

## Development Workflow

1. Run `npm run dev` to start both frontend and backend
2. Open your browser to http://localhost:3000
3. Make changes to either the frontend or backend code
4. The applications will automatically reload with your changes

## Troubleshooting

If you encounter issues:
1. Make sure all dependencies are installed: `npm install` in root, backend, and frontend directories
2. Check that ports 3000 and 3001 are not being used by other applications
3. Clear your browser cache if you're not seeing changes