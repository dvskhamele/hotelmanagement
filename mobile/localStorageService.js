// Local Storage Service for Mobile App
class LocalStorageService {
  constructor() {
    // Initialize with default data if not exists
    this.initializeData();
  }

  // Initialize default data in localStorage
  initializeData() {
    // Check if we already have data
    if (!localStorage.getItem('hotelData')) {
      const initialData = {
        users: [
          { id: 1, email: 'admin@example.com', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
          { id: 2, email: 'manager@example.com', password: 'manager123', role: 'MANAGER', name: 'Manager User' },
          { id: 3, email: 'supervisor@example.com', password: 'supervisor123', role: 'SUPERVISOR', name: 'Supervisor User' },
          { id: 4, email: 'staff@example.com', password: 'staff123', role: 'STAFF', name: 'Staff User' },
          { id: 5, email: 'housekeeping@example.com', password: 'housekeeping123', role: 'HOUSEKEEPING', name: 'Housekeeping Staff' }
        ],
        rooms: [
          { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
          { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
          { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
          { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' },
          { id: 5, number: '201', type: 'Standard', status: 'CLEAN' },
          { id: 6, number: '202', type: 'Standard', status: 'DIRTY' },
          { id: 7, number: '203', type: 'Deluxe', status: 'CLEAN' },
          { id: 8, number: '204', type: 'Suite', status: 'DIRTY' }
        ],
        guests: [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' },
          { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1234567891' },
          { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '+1234567892' }
        ],
        departments: [
          { id: 1, name: 'HOUSEKEEPING', description: 'Housekeeping Department' },
          { id: 2, name: 'MAINTENANCE', description: 'Maintenance Department' },
          { id: 3, name: 'FOOD_AND_BEVERAGE', description: 'Food and Beverage Department' },
          { id: 4, name: 'FRONT_OFFICE', description: 'Front Office Department' }
        ],
        requestStatuses: [
          { id: 1, status: 'PENDING' },
          { id: 2, status: 'IN_PROGRESS' },
          { id: 3, status: 'COMPLETED' },
          { id: 4, status: 'CANCELLED' }
        ],
        priorities: [
          { id: 1, level: 'LOW' },
          { id: 2, level: 'MEDIUM' },
          { id: 3, level: 'HIGH' },
          { id: 4, level: 'URGENT' }
        ],
        roomStatuses: [
          { id: 1, name: 'CLEAN' },
          { id: 2, name: 'DIRTY' },
          { id: 3, name: 'INSPECTED' },
          { id: 4, name: 'OUT_OF_ORDER' }
        ],
        requests: [
          { 
            id: 1, 
            guestId: 1, 
            roomId: 1, 
            departmentId: 1,
            title: 'Extra Towels', 
            description: 'Guest needs extra towels in room 101',
            priorityId: 2,
            statusId: 1,
            assignedToId: 5,
            createdAt: '2023-05-01T10:00:00Z',
            updatedAt: '2023-05-01T10:00:00Z'
          },
          { 
            id: 2, 
            guestId: 2, 
            roomId: 2, 
            departmentId: 2,
            title: 'Leaky Faucet', 
            description: 'Bathroom faucet is leaking in room 102',
            priorityId: 3,
            statusId: 2,
            assignedToId: null,
            createdAt: '2023-05-01T09:30:00Z',
            updatedAt: '2023-05-01T09:30:00Z'
          },
          { 
            id: 3, 
            guestId: 3, 
            roomId: 3, 
            departmentId: 3,
            title: 'Room Service', 
            description: 'Guest ordered breakfast to room 103',
            priorityId: 1,
            statusId: 3,
            assignedToId: null,
            createdAt: '2023-04-30T19:45:00Z',
            updatedAt: '2023-04-30T20:15:00Z'
          }
        ],
        notifications: []
      };
      
      localStorage.setItem('hotelData', JSON.stringify(initialData));
    }
  }

  // Get all data from localStorage
  getData() {
    const data = localStorage.getItem('hotelData');
    return data ? JSON.parse(data) : null;
  }

  // Save data to localStorage
  saveData(data) {
    localStorage.setItem('hotelData', JSON.stringify(data));
  }

  // Check if user has required role
  hasRole(userRole, requiredRoles) {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    if (typeof requiredRoles === 'string') {
      requiredRoles = [requiredRoles];
    }
    
    return requiredRoles.includes(userRole);
  }

  // User authentication
  login(email, password) {
    const data = this.getData();
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        token: email, // For prototype, we'll just use email as token
        user: userWithoutPassword
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  }

  // Notification methods
  getNotifications() {
    const data = this.getData();
    return data.notifications || [];
  }

  saveNotifications(notifications) {
    const data = this.getData();
    data.notifications = notifications;
    this.saveData(data);
  }

  createNotification(userId, type, title, message, relatedId = null) {
    try {
      const notifications = this.getNotifications();
      
      // Generate new ID
      const newId = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
      
      // Create new notification
      const newNotification = {
        id: newId,
        userId,
        type,
        title,
        message,
        relatedId,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      
      // Add to notifications array
      notifications.push(newNotification);
      
      // Save notifications
      this.saveNotifications(notifications);
      
      return {
        success: true,
        notification: newNotification
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create notification'
      };
    }
  }

  getUserNotifications(userId) {
    try {
      const notifications = this.getNotifications();
      const userNotifications = notifications.filter(n => n.userId === userId);
      return {
        success: true,
        notifications: userNotifications
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch notifications'
      };
    }
  }

  markAsRead(notificationId) {
    try {
      const notifications = this.getNotifications();
      const notificationIndex = notifications.findIndex(n => n.id === notificationId);
      
      if (notificationIndex !== -1) {
        notifications[notificationIndex].isRead = true;
        
        // Save notifications
        this.saveNotifications(notifications);
        
        return {
          success: true,
          notification: notifications[notificationIndex]
        };
      }
      
      return {
        success: false,
        error: 'Notification not found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to mark notification as read'
      };
    }
  }

  markAllAsRead(userId) {
    try {
      const notifications = this.getNotifications();
      const userNotifications = notifications.filter(n => n.userId === userId);
      
      userNotifications.forEach(notification => {
        const index = notifications.findIndex(n => n.id === notification.id);
        if (index !== -1) {
          notifications[index].isRead = true;
        }
      });
      
      // Save notifications
      this.saveNotifications(notifications);
      
      return {
        success: true,
        count: userNotifications.length
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to mark all notifications as read'
      };
    }
  }

  deleteNotification(notificationId) {
    try {
      const notifications = this.getNotifications();
      const filteredNotifications = notifications.filter(n => n.id !== notificationId);
      
      // Save notifications
      this.saveNotifications(filteredNotifications);
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete notification'
      };
    }
  }

  // Create room status change notification
  createRoomStatusNotification(userId, roomId, newStatus) {
    const title = 'Room Status Updated';
    const message = `Room ${roomId} has been marked as ${newStatus}`;
    return this.createNotification(userId, 'room_status', title, message, roomId);
  }

  // Create request status change notification
  createRequestStatusNotification(userId, requestId, newStatus) {
    const title = 'Request Status Updated';
    const message = `Request ${requestId} has been marked as ${newStatus}`;
    return this.createNotification(userId, 'request_status', title, message, requestId);
  }

  // Create new request notification
  createNewRequestNotification(userId, requestId, requestTitle) {
    const title = 'New Request Created';
    const message = `A new request has been created: ${requestTitle}`;
    return this.createNotification(userId, 'new_request', title, message, requestId);
  }

  // Get all rooms
  getAllRooms() {
    const data = this.getData();
    return data.rooms;
  }

  // Get room by ID
  getRoomById(roomId) {
    const data = this.getData();
    return data.rooms.find(room => room.id === parseInt(roomId));
  }

  // Update room status (only admins, managers, supervisors, and housekeeping can update)
  updateRoomStatus(roomId, newStatus, userId, userRole) {
    // Check permissions
    if (!this.hasRole(userRole, ['ADMIN', 'MANAGER', 'SUPERVISOR', 'HOUSEKEEPING'])) {
      return {
        success: false,
        error: 'Insufficient permissions to update room status'
      };
    }
    
    const data = this.getData();
    const roomIndex = data.rooms.findIndex(room => room.id === parseInt(roomId));
    
    if (roomIndex !== -1) {
      data.rooms[roomIndex].status = newStatus;
      data.rooms[roomIndex].updatedAt = new Date().toISOString();
      
      this.saveData(data);
      
      // Create notification
      this.createRoomStatusNotification(userId, roomId, newStatus);
      
      return {
        success: true,
        room: data.rooms[roomIndex]
      };
    }
    
    return {
      success: false,
      error: 'Room not found'
    };
  }

  // Get all requests
  getAllRequests() {
    const data = this.getData();
    
    // Enrich requests with related data
    const enrichedRequests = data.requests.map(request => {
      const guest = data.guests.find(g => g.id === request.guestId);
      const room = data.rooms.find(r => r.id === request.roomId);
      const department = data.departments.find(d => d.id === request.departmentId);
      const status = data.requestStatuses.find(s => s.id === request.statusId);
      const priority = data.priorities.find(p => p.id === request.priorityId);
      const assignedTo = request.assignedToId ? data.users.find(u => u.id === request.assignedToId) : null;
      
      return {
        ...request,
        guestName: guest ? guest.name : 'Unknown Guest',
        roomNumber: room ? room.number : 'Unknown Room',
        department: department ? department.name : 'Unknown Department',
        status: status ? status.status : 'Unknown Status',
        priority: priority ? priority.level : 'Unknown Priority',
        assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
      };
    });
    
    return enrichedRequests;
  }

  // Get requests by department (only admins, managers, and supervisors can view all departments)
  getRequestsByDepartment(departmentName, userRole) {
    // Check permissions for viewing all departments
    if (!this.hasRole(userRole, ['ADMIN', 'MANAGER', 'SUPERVISOR'])) {
      return {
        success: false,
        error: 'Insufficient permissions to view department requests'
      };
    }
    
    const data = this.getData();
    const department = data.departments.find(d => d.name === departmentName);
    
    if (!department) {
      return {
        success: false,
        error: 'Department not found'
      };
    }
    
    // Get requests for this department
    const departmentRequests = data.requests.filter(request => request.departmentId === department.id);
    
    // Enrich requests with related data
    const enrichedRequests = departmentRequests.map(request => {
      const guest = data.guests.find(g => g.id === request.guestId);
      const room = data.rooms.find(r => r.id === request.roomId);
      const status = data.requestStatuses.find(s => s.id === request.statusId);
      const priority = data.priorities.find(p => p.id === request.priorityId);
      const assignedTo = request.assignedToId ? data.users.find(u => u.id === request.assignedToId) : null;
      
      return {
        ...request,
        guestName: guest ? guest.name : 'Unknown Guest',
        roomNumber: room ? room.number : 'Unknown Room',
        department: department.name,
        status: status ? status.status : 'Unknown Status',
        priority: priority ? priority.level : 'Unknown Priority',
        assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
      };
    });
    
    return {
      success: true,
      requests: enrichedRequests
    };
  }

  // Create a new request (only admins, managers, supervisors, and front office can create)
  createRequest(requestData, userRole, userId) {
    // Check permissions
    if (!this.hasRole(userRole, ['ADMIN', 'MANAGER', 'SUPERVISOR', 'FRONT_OFFICE'])) {
      return {
        success: false,
        error: 'Insufficient permissions to create requests'
      };
    }
    
    const data = this.getData();
    
    // Generate new ID
    const newId = data.requests.length > 0 ? Math.max(...data.requests.map(r => r.id)) + 1 : 1;
    
    // Determine department based on request type
    const department = this.routeRequestToDepartment(requestData.type);
    const departmentObj = data.departments.find(d => d.name === department);
    
    // Create new request
    const newRequest = {
      id: newId,
      guestId: requestData.guestId,
      roomId: requestData.roomId,
      departmentId: departmentObj ? departmentObj.id : 1, // Default to housekeeping
      title: requestData.title,
      description: requestData.description,
      priorityId: requestData.priorityId || 2, // Default to medium
      statusId: 1, // Default to pending
      assignedToId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to requests array
    data.requests.push(newRequest);
    
    // Save data
    this.saveData(data);
    
    // Enrich with related data
    const guest = data.guests.find(g => g.id === newRequest.guestId);
    const room = data.rooms.find(r => r.id === newRequest.roomId);
    const status = data.requestStatuses.find(s => s.id === newRequest.statusId);
    const priority = data.priorities.find(p => p.id === newRequest.priorityId);
    
    const enrichedRequest = {
      ...newRequest,
      guestName: guest ? guest.name : 'Unknown Guest',
      roomNumber: room ? room.number : 'Unknown Room',
      department: department,
      status: status ? status.status : 'Unknown Status',
      priority: priority ? priority.level : 'Unknown Priority',
      assignedTo: 'Unassigned'
    };
    
    // Create notification
    this.createNewRequestNotification(userId, newRequest.id, newRequest.title);
    
    return {
      success: true,
      request: enrichedRequest
    };
  }

  // Update request status (only admins, managers, and supervisors can update)
  updateRequestStatus(requestId, newStatus, userId, userRole) {
    // Check permissions
    if (!this.hasRole(userRole, ['ADMIN', 'MANAGER', 'SUPERVISOR'])) {
      return {
        success: false,
        error: 'Insufficient permissions to update request status'
      };
    }
    
    const data = this.getData();
    const statusObj = data.requestStatuses.find(s => s.status === newStatus);
    
    if (!statusObj) {
      return {
        success: false,
        error: 'Invalid status'
      };
    }
    
    const requestIndex = data.requests.findIndex(request => request.id === parseInt(requestId));
    
    if (requestIndex !== -1) {
      data.requests[requestIndex].statusId = statusObj.id;
      data.requests[requestIndex].updatedAt = new Date().toISOString();
      
      // If completing request, assign to user
      if (newStatus === 'COMPLETED') {
        data.requests[requestIndex].assignedToId = userId;
      }
      
      this.saveData(data);
      
      // Create notification
      this.createRequestStatusNotification(userId, requestId, newStatus);
      
      // Enrich with related data
      const request = data.requests[requestIndex];
      const guest = data.guests.find(g => g.id === request.guestId);
      const room = data.rooms.find(r => r.id === request.roomId);
      const department = data.departments.find(d => d.id === request.departmentId);
      const status = data.requestStatuses.find(s => s.id === request.statusId);
      const priority = data.priorities.find(p => p.id === request.priorityId);
      const assignedTo = request.assignedToId ? data.users.find(u => u.id === request.assignedToId) : null;
      
      return {
        success: true,
        request: {
          ...request,
          guestName: guest ? guest.name : 'Unknown Guest',
          roomNumber: room ? room.number : 'Unknown Room',
          department: department ? department.name : 'Unknown Department',
          status: status ? status.status : 'Unknown Status',
          priority: priority ? priority.level : 'Unknown Priority',
          assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
        }
      };
    }
    
    return {
      success: false,
      error: 'Request not found'
    };
  }

  // Route request to appropriate department based on request type
  routeRequestToDepartment(requestType) {
    const routingMap = {
      'cleaning': 'HOUSEKEEPING',
      'maintenance': 'MAINTENANCE',
      'room_service': 'FOOD_AND_BEVERAGE',
      'amenity': 'FOOD_AND_BEVERAGE',
      'checkout': 'FRONT_OFFICE',
      'checkin': 'FRONT_OFFICE',
      'complaint': 'MANAGEMENT',
      'other': 'FRONT_OFFICE'
    };

    return routingMap[requestType] || 'FRONT_OFFICE';
  }
}

// Export as a singleton
const localStorageService = new LocalStorageService();
export default localStorageService;