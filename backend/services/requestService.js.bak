// Request Service - Handles guest requests and routing to departments
class RequestService {
  constructor(pmsIntegrationService) {
    this.pmsIntegrationService = pmsIntegrationService;
  }

  // Create a new guest request
  async createRequest(requestData) {
    try {
      // Determine which department should handle this request
      const department = this.routeRequestToDepartment(requestData.type);
      
      // Save to local database (simplified for prototype)
      const localRequest = {
        id: Math.floor(Math.random() * 10000),
        ...requestData,
        department,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };

      // Also create in PMS
      const pmsRequest = await this.pmsIntegrationService.createGuestRequest(requestData);

      // In a full implementation, we would send push notifications to staff here

      return {
        localRequest,
        pmsRequest,
        message: 'Request created successfully in both systems'
      };
    } catch (error) {
      throw new Error(`Failed to create request: ${error.message}`);
    }
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

  // Update request status
  async updateRequestStatus(requestId, newStatus, userId) {
    try {
      // Update in our local database (simplified for prototype)
      const updatedRequest = {
        id: requestId,
        status: newStatus,
        updatedBy: userId,
        updatedAt: new Date().toISOString()
      };

      // In a full implementation, we would also update in PMS if needed
      // and send notifications to relevant parties

      return {
        updatedRequest,
        message: 'Request status updated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to update request status: ${error.message}`);
    }
  }

  // Get all requests
  async getAllRequests() {
    // In a full implementation, this would query our database
    // For prototype, returning mock data
    return [
      { 
        id: 1, 
        guestName: 'John Doe', 
        roomNumber: '101', 
        type: 'cleaning', 
        department: 'HOUSEKEEPING',
        status: 'PENDING',
        priority: 'MEDIUM',
        createdAt: '2023-05-01T10:00:00Z'
      },
      { 
        id: 2, 
        guestName: 'Jane Smith', 
        roomNumber: '205', 
        type: 'maintenance', 
        department: 'MAINTENANCE',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        createdAt: '2023-05-01T09:30:00Z'
      },
      { 
        id: 3, 
        guestName: 'Robert Johnson', 
        roomNumber: '302', 
        type: 'room_service', 
        department: 'FOOD_AND_BEVERAGE',
        status: 'COMPLETED',
        priority: 'LOW',
        createdAt: '2023-04-30T19:45:00Z'
      }
    ];
  }

  // Get requests by department
  async getRequestsByDepartment(department) {
    // In a full implementation, this would query our database
    // For prototype, returning mock data
    const allRequests = await this.getAllRequests();
    return allRequests.filter(request => request.department === department);
  }
}

module.exports = RequestService;