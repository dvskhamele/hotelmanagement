// Vercel Edge Function compatible API handler
import { createHandler, initService } from '../src/handlers/apiHandlers';

// Initialize service
let hotelService;

// Initialize service if not already initialized
async function getHotelService() {
  if (!hotelService) {
    hotelService = new (require('../src/services/hotelService').default)();
    await hotelService.init();
  }
  return hotelService;
}

// Vercel Edge Function handler
export default async function handler(request, response) {
  try {
    // Set CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      response.status(200).end();
      return;
    }
    
    // Initialize service
    const service = await getHotelService();
    
    // Route handling
    const url = new URL(request.url, `http://${request.headers.host}`);
    const path = url.pathname;
    
    // Authentication endpoint
    if (path === '/api/auth/login' && request.method === 'POST') {
      const body = await request.json();
      const result = await service.authenticate(body.email, body.password);
      
      if (result.success) {
        response.status(200).json({
          user: result.user,
          token: 'fake-jwt-token'
        });
      } else {
        response.status(401).json({ error: 'Invalid credentials' });
      }
      return;
    }
    
    // Dashboard endpoints
    if (path === '/api/dashboard/stats' && request.method === 'GET') {
      const stats = await service.getDashboardStats();
      response.status(200).json(stats);
      return;
    }
    
    if (path === '/api/dashboard/activity' && request.method === 'GET') {
      const activity = await service.getRecentActivity();
      response.status(200).json(activity);
      return;
    }
    
    // Rooms endpoints
    if (path === '/api/rooms' && request.method === 'GET') {
      const rooms = await service.getAllRooms();
      response.status(200).json({ rooms });
      return;
    }
    
    const roomStatusMatch = path.match(/^\/api\/rooms\/(\d+)\/status$/);
    if (roomStatusMatch && request.method === 'PUT') {
      const roomId = parseInt(roomStatusMatch[1]);
      const body = await request.json();
      const room = await service.updateRoomStatus(roomId, body.status);
      response.status(200).json(room);
      return;
    }
    
    // Staff endpoints
    if (path === '/api/staff' && request.method === 'GET') {
      const staff = await service.getAllStaff();
      response.status(200).json({ staff });
      return;
    }
    
    const staffStatusMatch = path.match(/^\/api\/staff\/(\d+)\/status$/);
    if (staffStatusMatch && request.method === 'PUT') {
      const staffId = parseInt(staffStatusMatch[1]);
      const body = await request.json();
      const staff = await service.updateStaffStatus(staffId, body.status);
      response.status(200).json(staff);
      return;
    }
    
    // Requests endpoints
    if (path === '/api/requests' && request.method === 'GET') {
      const requests = await service.getAllRequests();
      response.status(200).json({ requests });
      return;
    }
    
    const requestStatusMatch = path.match(/^\/api\/requests\/(\d+)\/status$/);
    if (requestStatusMatch && request.method === 'PUT') {
      const requestId = parseInt(requestStatusMatch[1]);
      const body = await request.json();
      const request = await service.updateRequestStatus(requestId, body.status);
      response.status(200).json(request);
      return;
    }
    
    // Inventory endpoints
    if (path === '/api/inventory' && request.method === 'GET') {
      const inventory = await service.getAllInventory();
      response.status(200).json({ inventory });
      return;
    }
    
    const inventoryQuantityMatch = path.match(/^\/api\/inventory\/(\d+)\/quantity$/);
    if (inventoryQuantityMatch && request.method === 'PUT') {
      const inventoryId = parseInt(inventoryQuantityMatch[1]);
      const body = await request.json();
      const item = await service.updateInventoryQuantity(inventoryId, body.quantity);
      response.status(200).json(item);
      return;
    }
    
    // Departments endpoints
    if (path === '/api/departments' && request.method === 'GET') {
      const departments = await service.getAllDepartments();
      response.status(200).json({ departments });
      return;
    }
    
    // Default 404
    response.status(404).json({ error: 'Endpoint not found' });
  } catch (error) {
    console.error('Handler error:', error);
    response.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Export config for Vercel
export const config = {
  runtime: 'edge',
};