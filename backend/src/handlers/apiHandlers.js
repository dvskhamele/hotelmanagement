// Serverless API handler wrapper
const HotelService = require('../services/hotelService');

// Initialize service
let hotelService;

// Initialize service if not already initialized
async function initService() {
  if (!hotelService) {
    hotelService = new HotelService();
    await hotelService.init();
  }
  return hotelService;
}

// Wrapper function for serverless handlers
function createHandler(handlerFn) {
  return async (req, res) => {
    try {
      // Initialize service if needed
      const service = await initService();
      
      // Call the handler function with service and request/response
      const result = await handlerFn(service, req, res);
      
      // If handler didn't send response, send the result
      if (!res.headersSent && result !== undefined) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Handler error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message || 'Internal server error' });
      }
    }
  };
}

// Authentication handler
const authHandler = createHandler(async (service, req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const result = await service.authenticate(email, password);
    
    if (result.success) {
      res.status(200).json({
        user: result.user,
        token: 'fake-jwt-token'
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Dashboard handlers
const dashboardStatsHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const stats = await service.getDashboardStats();
    res.status(200).json(stats);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

const dashboardActivityHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const activity = await service.getRecentActivity();
    res.status(200).json(activity);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Rooms handlers
const roomsHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const rooms = await service.getAllRooms();
    res.status(200).json({ rooms });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

const roomStatusHandler = createHandler(async (service, req, res) => {
  if (req.method === 'PUT') {
    const { status } = req.body;
    const room = await service.updateRoomStatus(parseInt(req.query.id || req.params.id), status);
    res.status(200).json(room);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Staff handlers
const staffHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const staff = await service.getAllStaff();
    res.status(200).json({ staff });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

const staffStatusHandler = createHandler(async (service, req, res) => {
  if (req.method === 'PUT') {
    const { status } = req.body;
    const staff = await service.updateStaffStatus(parseInt(req.query.id || req.params.id), status);
    res.status(200).json(staff);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Requests handlers
const requestsHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const requests = await service.getAllRequests();
    res.status(200).json({ requests });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

const requestStatusHandler = createHandler(async (service, req, res) => {
  if (req.method === 'PUT') {
    const { status } = req.body;
    const request = await service.updateRequestStatus(parseInt(req.query.id || req.params.id), status);
    res.status(200).json(request);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Create new request handler
const createRequestHandler = createHandler(async (service, req, res) => {
  if (req.method === 'POST') {
    const { guestName, roomNumber, title, department, priority, description } = req.body;
    const request = await service.createRequest({ guestName, roomNumber, title, department, priority, description });
    res.status(201).json(request);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Get requests by department handler
const requestsByDepartmentHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const { department } = req.query;
    const requests = await service.getRequestsByDepartment(department);
    res.status(200).json({ requests });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Assign request to staff handler
const assignRequestHandler = createHandler(async (service, req, res) => {
  if (req.method === 'PUT') {
    const { staffId } = req.body;
    const requestId = parseInt(req.query.id || req.params.id);
    const request = await service.assignRequestToStaff(requestId, staffId);
    res.status(200).json(request);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Inventory handlers
const inventoryHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const inventory = await service.getAllInventory();
    res.status(200).json({ inventory });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

const inventoryQuantityHandler = createHandler(async (service, req, res) => {
  if (req.method === 'PUT') {
    const { quantity } = req.body;
    const item = await service.updateInventoryQuantity(parseInt(req.query.id || req.params.id), quantity);
    res.status(200).json(item);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

// Departments handlers
const departmentsHandler = createHandler(async (service, req, res) => {
  if (req.method === 'GET') {
    const departments = await service.getAllDepartments();
    res.status(200).json({ departments });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});

module.exports = {
  authHandler,
  dashboardStatsHandler,
  dashboardActivityHandler,
  roomsHandler,
  roomStatusHandler,
  staffHandler,
  staffStatusHandler,
  requestsHandler,
  requestStatusHandler,
  inventoryHandler,
  inventoryQuantityHandler,
  departmentsHandler,
  // Export the wrapper for creating new handlers
  createHandler,
  // Export initService for serverless environments
  initService
};