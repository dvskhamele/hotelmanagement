// Mock API service for mobile dashboard
const apiService = {
  getDashboardStats: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      stats: {
        pendingRequests: Math.floor(Math.random() * 20) + 5,
        occupiedRooms: Math.floor(Math.random() * 50) + 30,
        availableRooms: Math.floor(Math.random() * 30) + 10,
        revenueToday: Math.floor(Math.random() * 20000) + 5000,
        occupancyRate: Math.floor(Math.random() * 40) + 60,
        staffActive: Math.floor(Math.random() * 15) + 10,
        maintenanceRequests: Math.floor(Math.random() * 10) + 3,
        avgResponseTime: Math.floor(Math.random() * 20) + 15,
        guestSatisfaction: Math.floor(Math.random() * 20) + 80
      }
    };
  },
  
  getDashboardActivity: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      activity: [
        {
          id: '1',
          title: 'Room 204 Cleaned',
          description: 'Housekeeping completed cleaning',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'room',
          status: 'COMPLETED'
        },
        {
          id: '2',
          title: 'Guest Request #1247',
          description: 'Extra towels requested',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          type: 'request',
          status: 'COMPLETED'
        },
        {
          id: '3',
          title: 'Maintenance #892',
          description: 'AC repair in room 301',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          type: 'request',
          status: 'IN_PROGRESS'
        },
        {
          id: '4',
          title: 'Staff Check-in',
          description: 'John Smith started shift',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          type: 'staff',
          status: 'COMPLETED'
        },
        {
          id: '5',
          title: 'Room 105 Occupied',
          description: 'New guest checked in',
          timestamp: new Date(Date.now() - 18000000).toISOString(),
          type: 'room',
          status: 'COMPLETED'
        }
      ]
    };
  },
  
  getDashboardRooms: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      rooms: [
        { id: '101', status: 'CLEAN', guest: 'Robert Johnson' },
        { id: '102', status: 'OCCUPIED', guest: 'Sarah Williams' },
        { id: '103', status: 'DIRTY', guest: null },
        { id: '104', status: 'INSPECTED', guest: null },
        { id: '105', status: 'OCCUPIED', guest: 'Michael Brown' }
      ]
    };
  },
  
  getDashboardRequests: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      requests: [
        {
          id: '1001',
          guestName: 'Emma Davis',
          roomNumber: '201',
          title: 'Extra Pillows',
          department: 'HOUSEKEEPING',
          priority: 'MEDIUM',
          status: 'IN_PROGRESS'
        },
        {
          id: '1002',
          guestName: 'James Wilson',
          roomNumber: '305',
          title: 'TV Not Working',
          department: 'MAINTENANCE',
          priority: 'HIGH',
          status: 'PENDING'
        },
        {
          id: '1003',
          guestName: 'Olivia Martinez',
          roomNumber: '108',
          title: 'Room Service',
          department: 'FOOD_SERVICE',
          priority: 'LOW',
          status: 'COMPLETED'
        },
        {
          id: '1004',
          guestName: 'William Taylor',
          roomNumber: '402',
          title: 'Late Checkout',
          department: 'CONCIERGE',
          priority: 'MEDIUM',
          status: 'COMPLETED'
        },
        {
          id: '1005',
          guestName: 'Sophia Anderson',
          roomNumber: '207',
          title: 'Wi-Fi Issues',
          department: 'MAINTENANCE',
          priority: 'URGENT',
          status: 'PENDING'
        }
      ]
    };
  },
  
  getDashboardPerformance: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      housekeeping: Math.floor(Math.random() * 30) + 70,
      maintenance: Math.floor(Math.random() * 30) + 60,
      foodService: Math.floor(Math.random() * 20) + 80
    };
  }
};

export default apiService;