const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/out')));

// Simple data
let data = {
  rooms: [
    { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
    { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
    { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' }
  ],
  requests: [
    { id: 1, title: 'Extra Towels', status: 'PENDING' },
    { id: 2, title: 'Leaky Faucet', status: 'IN_PROGRESS' }
  ]
};

// API routes
app.get('/api/rooms', (req, res) => {
  res.json(data.rooms);
});

app.get('/api/requests', (req, res) => {
  res.json(data.requests);
});

// Dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
  const stats = {
    stats: {
      pendingRequests: 12,
      occupiedRooms: 65,
      availableRooms: 35,
      revenueToday: 12500,
      occupancyRate: 65,
      staffActive: 24,
      maintenanceRequests: 8,
      avgResponseTime: 32,
      guestSatisfaction: 94
    }
  };
  res.json(stats);
});

// Dashboard activity
app.get('/api/dashboard/activity', (req, res) => {
  const activity = {
    activity: [
      {
        id: 1,
        type: 'request',
        title: 'New request created',
        description: 'John Doe - Extra Towels (Room 101)',
        timestamp: new Date().toISOString(),
        status: 'PENDING'
      },
      {
        id: 2,
        type: 'room',
        title: 'Room status updated',
        description: 'Room 102 marked as DIRTY',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        status: 'DIRTY'
      },
      {
        id: 3,
        type: 'request',
        title: 'Request completed',
        description: 'Jane Smith - Leaky Faucet (Room 102)',
        timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        status: 'COMPLETED'
      }
    ]
  };
  res.json(activity);
});

// Dashboard rooms
app.get('/api/dashboard/rooms', (req, res) => {
  res.json({ rooms: data.rooms });
});

// Dashboard requests
app.get('/api/dashboard/requests', (req, res) => {
  res.json({ requests: data.requests });
});

// Dashboard performance
app.get('/api/dashboard/performance', (req, res) => {
  const performance = {
    housekeeping: 92,
    maintenance: 87,
    foodService: 95
  };
  res.json(performance);
});

// Staff endpoints
app.get('/api/staff', (req, res) => {
  const staff = {
    staff: [
      { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
      { id: 2, name: 'Jane Doe', role: 'Housekeeping', status: 'ACTIVE' },
      { id: 3, name: 'Robert Johnson', role: 'Maintenance', status: 'ON_BREAK' }
    ]
  };
  res.json(staff);
});

app.put('/api/staff/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // In a real app, you would update the staff status in your database
  res.json({
    success: true,
    staff: {
      id: parseInt(id),
      status: status,
      updatedAt: new Date().toISOString()
    }
  });
});

// Rooms status update
app.put('/api/rooms/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // In a real app, you would update the room status in your database
  res.json({
    success: true,
    room: {
      id: parseInt(id),
      status: status,
      updatedAt: new Date().toISOString()
    }
  });
});

// Requests status update
app.put('/api/requests/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // In a real app, you would update the request status in your database
  res.json({
    success: true,
    request: {
      id: parseInt(id),
      status: status,
      updatedAt: new Date().toISOString()
    }
  });
});

// Inventory endpoints
app.get('/api/inventory', (req, res) => {
  const inventory = {
    inventory: [
      { id: 1, name: 'Towels', quantity: 100, minStock: 50 },
      { id: 2, name: 'Soap', quantity: 200, minStock: 75 },
      { id: 3, name: 'Shampoo', quantity: 150, minStock: 60 }
    ]
  };
  res.json(inventory);
});

app.put('/api/inventory/:id/quantity', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  
  // In a real app, you would update the inventory in your database
  res.json({
    success: true,
    inventory: {
      id: parseInt(id),
      quantity: quantity,
      updatedAt: new Date().toISOString()
    }
  });
});

// Departments endpoints
app.get('/api/departments', (req, res) => {
  const departments = {
    departments: [
      { id: 1, name: 'HOUSEKEEPING', description: 'Housekeeping Department' },
      { id: 2, name: 'MAINTENANCE', description: 'Maintenance Department' },
      { id: 3, name: 'FOOD_AND_BEVERAGE', description: 'Food and Beverage Department' },
      { id: 4, name: 'FRONT_OFFICE', description: 'Front Office Department' }
    ]
  };
  res.json(departments);
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, you would validate credentials against your database
  res.json({
    user: {
      id: 1,
      email: email,
      name: email.split('@')[0],
      role: 'ADMIN'
    },
    token: 'mock-jwt-token'
  });
});

// Serve frontend for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/out/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/out/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});