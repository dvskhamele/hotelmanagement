// API Service for Hotel Operations Management
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
                     (typeof window !== 'undefined' ? 'http://localhost:5001' : 'http://localhost:5001');

// In production, use real API instead of mock data
// For this prototype, we'll use mock data with localStorage persistence
const USE_MOCK_DATA = true;

// Types for our API responses
interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

interface DashboardStats {
  stats: {
    pendingRequests: number;
    occupiedRooms: number;
    availableRooms: number;
    revenueToday: number;
    occupancyRate: number;
    staffActive: number;
    maintenanceRequests: number;
    avgResponseTime: number;
    patientSatisfaction: number;
  };
}

interface DashboardActivity {
  activity: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
}

interface DashboardRooms {
  rooms: Array<{
    id: number;
    number: string;
    type: string;
    status: string;
  }>;
}

interface DashboardRequests {
  requests: Array<{
    id: number;
    guestId: number;
    roomId: number;
    departmentId: number;
    title: string;
    description: string;
    priorityId: number;
    statusId: number;
    assignedToId: number;
    createdAt: string;
    updatedAt: string;
    guestName: string;
    roomNumber: string;
    department: string;
    status: string;
    priority: string;
    assignedTo: string;
  }>;
}

interface DashboardPerformance {
  housekeeping: number;
  maintenance: number;
  foodService: number;
}

interface RoomsResponse {
  rooms: Array<{
    id: number;
    number: string;
    type: string;
    status: string;
  }>;
}

interface StaffResponse {
  staff: Array<{
    id: number;
    name: string;
    role: string;
    status: string;
  }>;
}

interface RequestsResponse {
  requests: Array<{
    id: number;
    guestId: number;
    roomId: number;
    departmentId: number;
    title: string;
    description: string;
    priorityId: number;
    statusId: number;
    assignedToId: number;
    createdAt: string;
    updatedAt: string;
    guestName: string;
    roomNumber: string;
    department: string;
    status: string;
    priority: string;
    assignedTo: string;
  }>;
}

interface InventoryResponse {
  inventory: Array<{
    id: number;
    name: string;
    quantity: number;
    minStock: number;
  }>;
}

interface DepartmentsResponse {
  departments: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

class APIService {
  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      // For prototype, return mock data if backend is not available
      return {
        user: {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'ADMIN'
        },
        token: 'mock-jwt-token'
      };
    }
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      console.error('Dashboard stats error:', error);
      // For prototype, return mock data if backend is not available
      return {
        stats: {
          pendingRequests: 12,
          occupiedRooms: 65,
          availableRooms: 35,
          revenueToday: 12500,
          occupancyRate: 65,
          staffActive: 24,
          maintenanceRequests: 8,
          avgResponseTime: 32,
          patientSatisfaction: 94
        }
      };
    }
  }

  async getDashboardActivity(): Promise<DashboardActivity> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
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
    }

    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/activity`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard activity');
      }
      return {
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
    }
  }

  async getDashboardRooms(): Promise<DashboardRooms> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedRooms = localStorage.getItem('hotelRooms');
      if (storedRooms) {
        return JSON.parse(storedRooms);
      }
      return {
        rooms: [
          { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
          { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
          { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
          { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard rooms');
      }
      return {
        rooms: [
          { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
          { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
          { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
          { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' }
        ]
      };
    }
  }

  async getDashboardRequests(): Promise<DashboardRequests> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedRequests = localStorage.getItem('hotelRequests');
      if (storedRequests) {
        return JSON.parse(storedRequests);
      }
      return {
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            guestName: 'John Doe',
            roomNumber: '101',
            department: 'HOUSEKEEPING',
            status: 'PENDING',
            priority: 'MEDIUM',
            assignedTo: 'Housekeeping Staff'
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/requests`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard requests');
      }
      return {
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            guestName: 'John Doe',
            roomNumber: '101',
            department: 'HOUSEKEEPING',
            status: 'PENDING',
            priority: 'MEDIUM',
            assignedTo: 'Housekeeping Staff'
          }
        ]
      };
    }
  }

  async getDashboardPerformance(): Promise<DashboardPerformance> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        housekeeping: 92,
        maintenance: 87,
        foodService: 95
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/performance`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for dashboard performance');
      }
      return {
        housekeeping: 92,
        maintenance: 87,
        foodService: 95
      };
    }
  }

  // Rooms
  async getRooms(): Promise<RoomsResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedRooms = localStorage.getItem('hotelRooms');
      if (storedRooms) {
        return JSON.parse(storedRooms);
      }
      return {
        rooms: [
          { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
          { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
          { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
          { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' },
          { id: 5, number: '201', type: 'Standard', status: 'CLEAN' },
          { id: 6, number: '202', type: 'Standard', status: 'DIRTY' },
          { id: 7, number: '203', type: 'Deluxe', status: 'CLEAN' },
          { id: 8, number: '204', type: 'Suite', status: 'DIRTY' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for rooms');
      }
      return {
        rooms: [
          { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
          { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
          { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
          { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' },
          { id: 5, number: '201', type: 'Standard', status: 'CLEAN' },
          { id: 6, number: '202', type: 'Standard', status: 'DIRTY' },
          { id: 7, number: '203', type: 'Deluxe', status: 'CLEAN' },
          { id: 8, number: '204', type: 'Suite', status: 'DIRTY' }
        ]
      };
    }
  }

  async updateRoomStatus(roomId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedRooms = localStorage.getItem('hotelRooms');
      let roomsData = storedRooms ? JSON.parse(storedRooms) : {
        rooms: [
          { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
          { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
          { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
          { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' }
        ]
      };
      
      const roomIndex = roomsData.rooms.findIndex((room: any) => room.id === roomId);
      if (roomIndex !== -1) {
        roomsData.rooms[roomIndex] = { ...roomsData.rooms[roomIndex], status };
        localStorage.setItem('hotelRooms', JSON.stringify(roomsData));
      }
      
      return {
        success: true,
        room: {
          id: roomId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating room status update');
      }
      return {
        success: true,
        room: {
          id: roomId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Staff
  async getStaff(): Promise<StaffResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedStaff = localStorage.getItem('hotelStaff');
      if (storedStaff) {
        return JSON.parse(storedStaff);
      }
      return {
        staff: [
          { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
          { id: 2, name: 'Jane Doe', role: 'Housekeeping', status: 'ACTIVE' },
          { id: 3, name: 'Robert Johnson', role: 'Maintenance', status: 'ON_BREAK' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/staff`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for staff');
      }
      return {
        staff: [
          { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
          { id: 2, name: 'Jane Doe', role: 'Housekeeping', status: 'ACTIVE' },
          { id: 3, name: 'Robert Johnson', role: 'Maintenance', status: 'ON_BREAK' }
        ]
      };
    }
  }

  async updateStaffStatus(staffId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedStaff = localStorage.getItem('hotelStaff');
      let staffData = storedStaff ? JSON.parse(storedStaff) : {
        staff: [
          { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
          { id: 2, name: 'Jane Doe', role: 'Housekeeping', status: 'ACTIVE' },
          { id: 3, name: 'Robert Johnson', role: 'Maintenance', status: 'ON_BREAK' }
        ]
      };
      
      const staffIndex = staffData.staff.findIndex((staff: any) => staff.id === staffId);
      if (staffIndex !== -1) {
        staffData.staff[staffIndex] = { ...staffData.staff[staffIndex], status };
        localStorage.setItem('hotelStaff', JSON.stringify(staffData));
      }
      
      return {
        success: true,
        staff: {
          id: staffId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/staff/${staffId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating staff status update');
      }
      return {
        success: true,
        staff: {
          id: staffId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Requests
  async getRequests(): Promise<RequestsResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedRequests = localStorage.getItem('hotelRequests');
      if (storedRequests) {
        return JSON.parse(storedRequests);
      }
      return {
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            guestName: 'John Doe',
            roomNumber: '101',
            department: 'HOUSEKEEPING',
            status: 'PENDING',
            priority: 'MEDIUM',
            assignedTo: 'Housekeeping Staff'
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/requests`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for requests');
      }
      return {
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            guestName: 'John Doe',
            roomNumber: '101',
            department: 'HOUSEKEEPING',
            status: 'PENDING',
            priority: 'MEDIUM',
            assignedTo: 'Housekeeping Staff'
          }
        ]
      };
    }
  }

  async updateRequestStatus(requestId: number, status: string): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedRequests = localStorage.getItem('hotelRequests');
      let requestsData = storedRequests ? JSON.parse(storedRequests) : {
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            guestName: 'John Doe',
            roomNumber: '101',
            department: 'HOUSEKEEPING',
            status: 'PENDING',
            priority: 'MEDIUM',
            assignedTo: 'Housekeeping Staff'
          }
        ]
      };
      
      const requestIndex = requestsData.requests.findIndex((request: any) => request.id === requestId);
      if (requestIndex !== -1) {
        requestsData.requests[requestIndex] = { ...requestsData.requests[requestIndex], status };
        localStorage.setItem('hotelRequests', JSON.stringify(requestsData));
      }
      
      return {
        success: true,
        request: {
          id: requestId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating request status update');
      }
      return {
        success: true,
        request: {
          id: requestId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Inventory
  async getInventory(): Promise<InventoryResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedInventory = localStorage.getItem('hotelInventory');
      if (storedInventory) {
        return JSON.parse(storedInventory);
      }
      return {
        inventory: [
          { id: 1, name: 'Towels', quantity: 100, minStock: 50 },
          { id: 2, name: 'Soap', quantity: 200, minStock: 75 },
          { id: 3, name: 'Shampoo', quantity: 150, minStock: 60 }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/inventory`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for inventory');
      }
      return {
        inventory: [
          { id: 1, name: 'Towels', quantity: 100, minStock: 50 },
          { id: 2, name: 'Soap', quantity: 200, minStock: 75 },
          { id: 3, name: 'Shampoo', quantity: 150, minStock: 60 }
        ]
      };
    }
  }

  async updateInventoryQuantity(inventoryId: number, quantity: number): Promise<any> {
    // In production, always use mock data and store in localStorage
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedInventory = localStorage.getItem('hotelInventory');
      let inventoryData = storedInventory ? JSON.parse(storedInventory) : {
        inventory: [
          { id: 1, name: 'Towels', quantity: 100, minStock: 50 },
          { id: 2, name: 'Soap', quantity: 200, minStock: 75 },
          { id: 3, name: 'Shampoo', quantity: 150, minStock: 60 }
        ]
      };
      
      const inventoryIndex = inventoryData.inventory.findIndex((item: any) => item.id === inventoryId);
      if (inventoryIndex !== -1) {
        inventoryData.inventory[inventoryIndex] = { ...inventoryData.inventory[inventoryIndex], quantity };
        localStorage.setItem('hotelInventory', JSON.stringify(inventoryData));
      }
      
      return {
        success: true,
        inventory: {
          id: inventoryId,
          quantity: quantity,
          updatedAt: new Date().toISOString()
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/inventory/${inventoryId}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update inventory quantity');
      }

      return response.json();
    } catch (error) {
      // For prototype, simulate success even if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, simulating inventory quantity update');
      }
      return {
        success: true,
        inventory: {
          id: inventoryId,
          quantity: quantity,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Departments
  async getDepartments(): Promise<DepartmentsResponse> {
    // In production, always use mock data
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedDepartments = localStorage.getItem('hotelDepartments');
      if (storedDepartments) {
        return JSON.parse(storedDepartments);
      }
      return {
        departments: [
          { id: 1, name: 'HOUSEKEEPING', description: 'Housekeeping Department' },
          { id: 2, name: 'MAINTENANCE', description: 'Maintenance Department' },
          { id: 3, name: 'FOOD_AND_BEVERAGE', description: 'Food and Beverage Department' },
          { id: 4, name: 'FRONT_OFFICE', description: 'Front Office Department' }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/departments`);
      if (!response.ok) {
        throw new Error('This is a Demo version - In the real version, you will get actual data from the backend');
      }
      return response.json();
    } catch (error) {
      // For prototype, return mock data if backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Backend not available, using mock data for departments');
      }
      return {
        departments: [
          { id: 1, name: 'HOUSEKEEPING', description: 'Housekeeping Department' },
          { id: 2, name: 'MAINTENANCE', description: 'Maintenance Department' },
          { id: 3, name: 'FOOD_AND_BEVERAGE', description: 'Food and Beverage Department' },
          { id: 4, name: 'FRONT_OFFICE', description: 'Front Office Department' }
        ]
      };
    }
  }
}

const apiService = new APIService();
export default apiService;