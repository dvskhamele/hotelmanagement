const express = require('express');
const router = express.Router();
const HotelService = require('../services/hotelService');

// Initialize service
let hotelService;

// Middleware to initialize service
router.use(async (req, res, next) => {
  if (!hotelService) {
    hotelService = new HotelService();
    await hotelService.init();
  }
  next();
});

// Get dashboard overview data
router.get('/overview', async (req, res) => {
  try {
    // Get statistics from different services
    const requests = await hotelService.getAllRequests();
    const rooms = await hotelService.getAllRooms();
    const staff = await hotelService.getAllStaff();
    
    // Calculate dashboard statistics
    const stats = {
      pendingRequests: requests.filter(r => r.status === 'PENDING').length,
      inProgressRequests: requests.filter(r => r.status === 'IN_PROGRESS').length,
      completedRequests: requests.filter(r => r.status === 'COMPLETED').length,
      urgentRequests: requests.filter(r => r.priority === 'URGENT').length,
      dirtyRooms: rooms.filter(r => r.status === 'DIRTY').length,
      cleanRooms: rooms.filter(r => r.status === 'CLEAN').length,
      inspectedRooms: rooms.filter(r => r.status === 'INSPECTED').length,
      outOfOrderRooms: rooms.filter(r => r.status === 'OUT_OF_ORDER').length,
      activeStaff: staff.filter(s => s.status === 'Active').length,
      onBreakStaff: staff.filter(s => s.status === 'On Break').length
    };
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get department-specific data
router.get('/departments', async (req, res) => {
  try {
    // In a real implementation, we would get this from a departments collection
    // For prototype, we'll use mock data
    const departments = [
      {
        id: 1,
        name: 'Housekeeping',
        description: 'Room cleaning and maintenance',
        head: 'Alice Johnson',
        staffCount: 8,
        pendingRequests: 5,
        inProgressRequests: 3,
        completedRequests: 12,
        performance: 92
      },
      {
        id: 2,
        name: 'Maintenance',
        description: 'Facility and equipment maintenance',
        head: 'Robert Wilson',
        staffCount: 5,
        pendingRequests: 3,
        inProgressRequests: 2,
        completedRequests: 8,
        performance: 87
      },
      {
        id: 3,
        name: 'Food & Beverage',
        description: 'Room service and dining',
        head: 'Emily Davis',
        staffCount: 12,
        pendingRequests: 7,
        inProgressRequests: 4,
        completedRequests: 22,
        performance: 95
      },
      {
        id: 4,
        name: 'Front Office',
        description: 'Guest services and check-in/check-out',
        head: 'Michael Brown',
        staffCount: 6,
        pendingRequests: 2,
        inProgressRequests: 1,
        completedRequests: 15,
        performance: 89
      }
    ];
    
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent activity across all departments
router.get('/activity', async (req, res) => {
  try {
    const activity = await hotelService.getRecentActivity();
    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get task assignments for current user
router.get('/my-tasks', async (req, res) => {
  try {
    // For prototype, we'll use mock data
    // In a real implementation, we would filter by user ID
    const tasks = [
      {
        id: 1,
        title: 'Clean Room 205',
        description: 'Standard cleaning for occupied room',
        department: 'Housekeeping',
        priority: 'HIGH',
        status: 'PENDING',
        assignedTo: 1,
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        roomNumber: '205'
      },
      {
        id: 2,
        title: 'Inspect Room 108',
        description: 'Final inspection before guest arrival',
        department: 'Housekeeping',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        assignedTo: 1,
        dueDate: new Date(Date.now() + 172800000).toISOString(), // In 2 days
        roomNumber: '108'
      },
      {
        id: 3,
        title: 'Replace towels in Room 302',
        description: 'Guest requested fresh towels',
        department: 'Housekeeping',
        priority: 'URGENT',
        status: 'PENDING',
        assignedTo: 1,
        dueDate: new Date(Date.now() + 3600000).toISOString(), // In 1 hour
        roomNumber: '302'
      }
    ];
    
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign task to staff member
router.post('/tasks/assign', async (req, res) => {
  try {
    const { taskId, staffId } = req.body;
    
    if (!taskId || !staffId) {
      return res.status(400).json({ error: 'Missing task ID or staff ID' });
    }
    
    // In a real implementation, we would update the task in the database
    // For prototype, we'll just return success
    console.log(`Task ${taskId} assigned to staff ${staffId}`);
    
    res.json({ 
      success: true, 
      message: `Task assigned to staff member ${staffId}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status
router.put('/tasks/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // In a real implementation, we would update the task in the database
    // For prototype, we'll just return success
    console.log(`Task ${req.params.id} status updated to ${status}`);
    
    res.json({ 
      success: true, 
      message: `Task status updated to ${status}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create inter-departmental task
router.post('/tasks/create', async (req, res) => {
  try {
    const { title, description, department, priority, assignedTo } = req.body;
    
    // Validate required fields
    if (!title || !department) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In a real implementation, we would create the task in the database
    // For prototype, we'll just return success
    console.log(`New task created: ${title} for ${department}`);
    
    res.status(201).json({ 
      success: true, 
      message: 'Task created successfully',
      task: {
        id: Date.now(), // Simple ID for prototype
        title,
        description,
        department,
        priority: priority || 'MEDIUM',
        status: 'PENDING',
        assignedTo: assignedTo || null,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;