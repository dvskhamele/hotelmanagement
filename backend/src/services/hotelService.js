// Hotel data service
const DatabaseAdapter = require('../utils/database');
const { config } = require('../config');

class HotelService {
  constructor() {
    this.db = new DatabaseAdapter(config);
  }

  // Initialize service
  async init() {
    await this.db.init();
  }

  // Authentication service
  async authenticate(email, password) {
    const users = await this.db.find('users', { email, password });
    if (users.length > 0) {
      const { password, ...user } = users[0];
      return { success: true, user };
    }
    
    // For prototype, create user if not found
    const newUser = await this.db.create('users', {
      email,
      name: email.split('@')[0],
      role: 'ADMIN'
    });
    
    const { password: pwd, ...user } = newUser;
    return { success: true, user };
  }

  // Dashboard statistics
  async getDashboardStats() {
    const data = await this.db.getData();
    
    return {
      pendingRequests: data.requests.filter(r => r.status === 'PENDING').length,
      occupiedRooms: data.rooms.filter(r => r.status === 'DIRTY' || r.status === 'INSPECTED').length,
      availableRooms: data.rooms.filter(r => r.status === 'CLEAN').length,
      staffActive: data.staff.filter(s => s.status === 'Active').length,
      maintenanceRequests: data.requests.filter(r => r.department === 'Maintenance').length,
      avgResponseTime: 32,
      guestSatisfaction: 94,
      revenueToday: 12500,
      occupancyRate: 65
    };
  }

  // Recent activity
  async getRecentActivity() {
    const data = await this.db.getData();
    return data.activity.slice(-10).reverse();
  }

  // Rooms service
  async getAllRooms() {
    return await this.db.find('rooms', {});
  }

  async getRoomById(roomId) {
    return await this.db.findById('rooms', roomId);
  }

  async updateRoomStatus(roomId, status) {
    const room = await this.db.findById('rooms', roomId);
    if (room) {
      const updatedRoom = await this.db.update('rooms', roomId, {
        status,
        updatedAt: new Date().toISOString()
      });
      
      // Log activity
      await this.db.create('activity', {
        type: 'room',
        title: 'Room status updated',
        description: `Room ${room.number} marked as ${status}`,
        timestamp: new Date().toISOString(),
        status
      });
      
      return updatedRoom;
    } else {
      // Create room if not found
      const newRoom = await this.db.create('rooms', {
        id: roomId,
        number: roomId.toString(),
        floor: Math.floor(roomId / 100),
        type: 'Standard',
        status,
        updatedAt: new Date().toISOString()
      });
      
      // Log activity
      await this.db.create('activity', {
        type: 'room',
        title: 'Room status updated',
        description: `Room ${newRoom.number} marked as ${status}`,
        timestamp: new Date().toISOString(),
        status
      });
      
      return newRoom;
    }
  }

  async logActivity(activityData) {
    return await this.db.create('activity', activityData);
  }

  // Staff service
  async getAllStaff() {
    return await this.db.find('staff', {});
  }

  async updateStaffStatus(staffId, status) {
    const staff = await this.db.findById('staff', staffId);
    if (staff) {
      return await this.db.update('staff', staffId, { status });
    } else {
      // Create staff if not found
      const newStaff = await this.db.create('staff', {
        id: staffId,
        name: `Staff ${staffId}`,
        department: 'General',
        position: 'Staff',
        status,
        email: `staff${staffId}@hotelops.com`,
        phone: '+1234567890',
        hireDate: new Date().toISOString(),
        performance: 85,
        schedule: '9:00 AM - 5:00 PM'
      });
      
      return newStaff;
    }
  }

  // Requests service
  async getAllRequests() {
    return await this.db.find('requests', {});
  }

  async getRequestById(requestId) {
    return await this.db.findById('requests', requestId);
  }

  async createRequest(requestData) {
    // Generate new ID
    const allRequests = await this.getAllRequests();
    const newId = allRequests.length > 0 ? Math.max(...allRequests.map(r => r.id)) + 1 : 1;
    
    const newRequest = {
      id: newId,
      guestName: requestData.guestName,
      roomNumber: requestData.roomNumber,
      title: requestData.title,
      department: requestData.department,
      priority: requestData.priority,
      status: requestData.status,
      createdAt: new Date().toISOString(),
      comments: []
    };
    
    const createdRequest = await this.db.create('requests', newRequest);
    
    // Log activity
    await this.db.create('activity', {
      type: 'request',
      title: 'New guest request',
      description: `${requestData.guestName} - ${requestData.title} (${requestData.department})`,
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    });
    
    return createdRequest;
  }

  async updateRequestStatus(requestId, status) {
    const request = await this.db.findById('requests', requestId);
    if (request) {
      const updatedRequest = await this.db.update('requests', requestId, { status });
      
      // Log activity
      await this.db.create('activity', {
        type: 'request',
        title: `Request ${status.toLowerCase()}`,
        description: `${request.guestName} - ${request.title} (${request.department})`,
        timestamp: new Date().toISOString(),
        status
      });
      
      return updatedRequest;
    } else {
      // Create request if not found
      const newRequest = await this.db.create('requests', {
        id: requestId,
        guestName: 'Guest ' + requestId,
        roomNumber: '100',
        title: 'Sample Request',
        department: 'General',
        priority: 'MEDIUM',
        status,
        createdAt: new Date().toISOString()
      });
      
      // Log activity
      await this.db.create('activity', {
        type: 'request',
        title: `Request ${status.toLowerCase()}`,
        description: `${newRequest.guestName} - ${newRequest.title} (${newRequest.department})`,
        timestamp: new Date().toISOString(),
        status
      });
      
      return newRequest;
    }
  }

  async assignRequestToStaff(requestId, staffId) {
    const request = await this.db.findById('requests', requestId);
    if (request) {
      return await this.db.update('requests', requestId, { assignedTo: staffId });
    }
    return null;
  }

  async addCommentToRequest(requestId, commentData) {
    const request = await this.db.findById('requests', requestId);
    if (request) {
      const updatedComments = request.comments ? [...request.comments, commentData] : [commentData];
      return await this.db.update('requests', requestId, { comments: updatedComments });
    }
    return null;
  }

  // Inventory service
  async getAllInventory() {
    return await this.db.find('inventory', {});
  }

  async updateInventoryQuantity(inventoryId, quantity) {
    const item = await this.db.findById('inventory', inventoryId);
    if (item) {
      return await this.db.update('inventory', inventoryId, { quantity });
    } else {
      // Create item if not found
      const newItem = await this.db.create('inventory', {
        id: inventoryId,
        name: 'Item ' + inventoryId,
        category: 'General',
        quantity,
        minStock: 10,
        supplier: 'Supplier',
        price: 10.00,
        lastOrdered: new Date().toISOString()
      });
      
      return newItem;
    }
  }

  // Departments service
  async getAllDepartments() {
    return await this.db.find('departments', {});
  }
}

module.exports = HotelService;