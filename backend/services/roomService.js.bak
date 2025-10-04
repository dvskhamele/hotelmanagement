// Room Service - Handles room status updates and management
class RoomService {
  constructor(pmsIntegrationService) {
    this.pmsIntegrationService = pmsIntegrationService;
  }

  // Get room status (from both local database and PMS)
  async getRoomStatus(roomId) {
    try {
      // In a full implementation, we would first check our local database
      // Then verify with PMS if needed
      
      // For prototype, we'll just get from PMS
      const pmsStatus = await this.pmsIntegrationService.getRoomStatus(roomId);
      
      return {
        roomId,
        localStatus: 'CLEAN', // This would come from our database in full implementation
        pmsStatus: pmsStatus.status,
        lastSynced: pmsStatus.lastUpdated
      };
    } catch (error) {
      throw new Error(`Failed to get room status: ${error.message}`);
    }
  }

  // Update room status in both local system and PMS
  async updateRoomStatus(roomId, newStatus, userId) {
    try {
      // Update in our local database (simplified for prototype)
      const localUpdate = {
        roomId,
        status: newStatus,
        updatedBy: userId,
        timestamp: new Date().toISOString()
      };

      // Update in PMS
      const pmsUpdate = await this.pmsIntegrationService.updateRoomStatus(roomId, newStatus);

      return {
        localUpdate,
        pmsUpdate,
        message: 'Room status updated successfully in both systems'
      };
    } catch (error) {
      throw new Error(`Failed to update room status: ${error.message}`);
    }
  }

  // Get all rooms with their statuses
  async getAllRooms() {
    // In a full implementation, this would query our database
    // For prototype, returning mock data
    return [
      { id: 1, number: '101', status: 'CLEAN' },
      { id: 2, number: '102', status: 'DIRTY' },
      { id: 3, number: '103', status: 'INSPECTED' },
      { id: 4, number: '104', status: 'OUT_OF_ORDER' },
      { id: 5, number: '201', status: 'CLEAN' },
      { id: 6, number: '202', status: 'DIRTY' }
    ];
  }
}

module.exports = RoomService;