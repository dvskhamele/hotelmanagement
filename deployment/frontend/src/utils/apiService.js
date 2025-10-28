// API Service for interacting with backend
class ApiService {
  constructor() {
    // Use environment variable for API URL, with fallback to localhost:3001
    // For Netlify deployments, the API will be at the same origin
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                  (typeof window !== 'undefined' ? window.location.origin + '/api' : 'http://localhost:3001/api');
    // In production, always use mock data
    this.useMockData = process.env.NODE_ENV === 'production';
  }

  // Mock data for when backend is not available
  getMockDashboardStats() {
    return Promise.resolve({
      pendingRequests: 12,
      occupiedRooms: 42,
      availableRooms: 8,
      totalStaff: 24,
      guestSatisfaction: 94,
      revenue: 12500
    });
  }

  getMockRecentActivity() {
    return Promise.resolve([
      {
        id: 1,
        type: 'request',
        title: 'New request created',
        description: 'John Doe - Extra towels (Room 205)',
        time: '2 minutes ago'
      },
      {
        id: 2,
        type: 'room',
        title: 'Room status updated',
        description: 'Room 103 marked as Clean',
        time: '1 hour ago'
      },
      {
        id: 3,
        type: 'request',
        title: 'Request completed',
        description: 'Room service delivered to Room 102',
        time: '15 minutes ago'
      },
      {
        id: 4,
        type: 'maintenance',
        title: 'Maintenance request',
        description: 'Leaky faucet reported in Room 302',
        time: '2 hours ago'
      }
    ]);
  }

  getMockNotifications() {
    return Promise.resolve([
      {
        id: 1,
        title: 'New guest request',
        message: 'John Doe needs extra towels in Room 205',
        time: '2 minutes ago',
        read: false
      },
      {
        id: 2,
        title: 'Room status updated',
        message: 'Room 103 has been marked as Clean',
        time: '1 hour ago',
        read: false
      },
      {
        id: 3,
        title: 'Maintenance required',
        message: 'Leaky faucet reported in Room 302',
        time: '2 hours ago',
        read: true
      }
    ]);
  }

  // Authentication
  async login(email, password) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve({
        user: { id: 1, name: 'Admin User', email: email, role: 'admin' },
        token: 'mock-jwt-token'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
    } catch (error) {
      // Mock login for development
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock login due to backend error:', error);
      }
      return Promise.resolve({
        user: { id: 1, name: 'Admin User', email: email, role: 'admin' },
        token: 'mock-jwt-token'
      });
    }
  }

  // Dashboard
  async getDashboardStats() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockDashboardStats();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock dashboard stats due to backend error:', error);
      }
      return this.getMockDashboardStats();
    }
  }

  async getRecentActivity() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockRecentActivity();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock recent activity due to backend error:', error);
      }
      return this.getMockRecentActivity();
    }
  }

  // Rooms
  async getAllRooms() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedRooms = localStorage.getItem('hotelRooms');
      if (storedRooms) {
        return Promise.resolve(JSON.parse(storedRooms));
      }
      return Promise.resolve([
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/rooms`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock rooms data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ]);
    }
  }

  async getRoomById(id) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({
        id: id,
        status: 'clean',
        lastUpdated: '2 hours ago'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock room data due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: 'clean',
        lastUpdated: '2 hours ago'
      });
    }
  }

  async updateRoomStatus(id, status, userId) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedRooms = localStorage.getItem('hotelRooms');
      let rooms = storedRooms ? JSON.parse(storedRooms) : [
        { id: 101, status: 'clean', lastUpdated: '2 hours ago' },
        { id: 102, status: 'dirty', lastUpdated: '5 hours ago' },
        { id: 103, status: 'inspected', lastUpdated: '1 day ago' },
        { id: 104, status: 'dirty', lastUpdated: '3 hours ago' }
      ];
      
      const roomIndex = rooms.findIndex(room => room.id === id);
      if (roomIndex !== -1) {
        rooms[roomIndex] = { ...rooms[roomIndex], status, lastUpdated: 'Just now' };
        localStorage.setItem('hotelRooms', JSON.stringify(rooms));
      }
      
      return Promise.resolve({
        id: id,
        status: status,
        lastUpdated: 'Just now'
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, userId }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock room update due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: status,
        lastUpdated: 'Just now'
      });
    }
  }

  // Requests
  async getAllRequests() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Try to get from localStorage first
      const storedRequests = localStorage.getItem('hotelRequests');
      if (storedRequests) {
        return Promise.resolve(JSON.parse(storedRequests));
      }
      return Promise.resolve([
        { id: 1, guest: 'John Doe', room: 205, request: 'Extra towels', priority: 'medium', status: 'pending' },
        { id: 2, guest: 'Jane Smith', room: 102, request: 'Room service', priority: 'high', status: 'in-progress' },
        { id: 3, guest: 'Robert Johnson', room: 302, request: 'Maintenance', priority: 'low', status: 'completed' }
      ]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock requests data due to backend error:', error);
      }
      return Promise.resolve([
        { id: 1, guest: 'John Doe', room: 205, request: 'Extra towels', priority: 'medium', status: 'pending' },
        { id: 2, guest: 'Jane Smith', room: 102, request: 'Room service', priority: 'high', status: 'in-progress' },
        { id: 3, guest: 'Robert Johnson', room: 302, request: 'Maintenance', priority: 'low', status: 'completed' }
      ]);
    }
  }

  async getRequestsByDepartment(department) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve([]);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests/department/${department}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock department requests due to backend error:', error);
      }
      return Promise.resolve([]);
    }
  }

  async createRequest(requestData) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedRequests = localStorage.getItem('hotelRequests');
      let requests = storedRequests ? JSON.parse(storedRequests) : [
        { id: 1, guest: 'John Doe', room: 205, request: 'Extra towels', priority: 'medium', status: 'pending' },
        { id: 2, guest: 'Jane Smith', room: 102, request: 'Room service', priority: 'high', status: 'in-progress' },
        { id: 3, guest: 'Robert Johnson', room: 302, request: 'Maintenance', priority: 'low', status: 'completed' }
      ];
      
      const newRequest = {
        id: Date.now(),
        ...requestData,
        status: 'pending'
      };
      
      requests.push(newRequest);
      localStorage.setItem('hotelRequests', JSON.stringify(requests));
      
      return Promise.resolve(newRequest);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestData),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock request creation due to backend error:', error);
      }
      return Promise.resolve({
        id: Date.now(),
        ...requestData,
        status: 'pending'
      });
    }
  }

  async updateRequestStatus(id, status, userId) {
    // In production, always use mock data and store in localStorage
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update localStorage
      const storedRequests = localStorage.getItem('hotelRequests');
      let requests = storedRequests ? JSON.parse(storedRequests) : [
        { id: 1, guest: 'John Doe', room: 205, request: 'Extra towels', priority: 'medium', status: 'pending' },
        { id: 2, guest: 'Jane Smith', room: 102, request: 'Room service', priority: 'high', status: 'in-progress' },
        { id: 3, guest: 'Robert Johnson', room: 302, request: 'Maintenance', priority: 'low', status: 'completed' }
      ];
      
      const requestIndex = requests.findIndex(request => request.id === id);
      if (requestIndex !== -1) {
        requests[requestIndex] = { ...requests[requestIndex], status };
        localStorage.setItem('hotelRequests', JSON.stringify(requests));
      }
      
      return Promise.resolve({
        id: id,
        status: status
      });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, userId }),
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock request update due to backend error:', error);
      }
      return Promise.resolve({
        id: id,
        status: status
      });
    }
  }

  // Notifications
  async getNotifications() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockNotifications();
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notifications due to backend error:', error);
      }
      return this.getMockNotifications();
    }
  }

  async markNotificationAsRead(id) {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notification update due to backend error:', error);
      }
      return Promise.resolve({ success: true });
    }
  }

  async markAllNotificationsAsRead() {
    // In production, always use mock data
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return Promise.resolve({ success: true });
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.json();
    } catch (error) {
      // Use mock data when backend is not available
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Using mock notification update due to backend error:', error);
      }
      return Promise.resolve({ success: true });
    }
  }
}

// Export as a singleton
const apiService = new ApiService();
export default apiService;