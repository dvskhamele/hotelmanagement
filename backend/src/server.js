const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/out')));

// Simple in-memory data
let rooms = [
  { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
  { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
  { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
  { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' }
];

let requests = [
  { 
    id: 1, 
    title: 'Extra Towels', 
    description: 'Guest needs extra towels in room 101',
    status: 'PENDING',
    priority: 'MEDIUM'
  },
  { 
    id: 2, 
    title: 'Leaky Faucet', 
    description: 'Bathroom faucet is leaking in room 102',
    status: 'IN_PROGRESS',
    priority: 'HIGH'
  }
];

// Import routes
const requestRoutes = require('./routes/requestRoutes');
const housekeepingRoutes = require('./routes/housekeepingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const pmsRoutes = require('./routes/pmsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const guestRoutes = require('./routes/guestRoutes');

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HotelOps API is running' });
});

app.get('/api/rooms', (req, res) => {
  res.json({ rooms });
});

app.get('/api/requests', (req, res) => {
  res.json({ requests });
});

app.put('/api/rooms/:id/status', (req, res) => {
  const { status } = req.body;
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  
  if (room) {
    room.status = status;
    res.json({ success: true, room });
  } else {
    res.status(404).json({ error: 'Room not found' });
  }
});

app.put('/api/requests/:id/status', (req, res) => {
  const { status } = req.body;
  const request = requests.find(r => r.id === parseInt(req.params.id));
  
  if (request) {
    request.status = status;
    res.json({ success: true, request });
  } else {
    res.status(404).json({ error: 'Request not found' });
  }
});

// Enhanced API routes
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/housekeeping', housekeepingRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/pms', pmsRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/guest', guestRoutes);

// Serve frontend for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/rooms', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/requests', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/staff', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/inventory', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/departments', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HotelOps server running on port ${PORT}`);
});