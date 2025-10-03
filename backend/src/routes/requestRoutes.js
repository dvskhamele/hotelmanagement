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

// Get all requests with filtering and sorting options
router.get('/', async (req, res) => {
  try {
    const { department, status, priority, page = 1, limit = 20 } = req.query;
    const requests = await hotelService.getAllRequests();
    
    // Apply filters
    let filteredRequests = requests;
    
    if (department) {
      filteredRequests = filteredRequests.filter(r => r.department === department);
    }
    
    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    if (priority) {
      filteredRequests = filteredRequests.filter(r => r.priority === priority);
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);
    
    res.json({
      requests: paginatedRequests,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredRequests.length / limit),
        totalRequests: filteredRequests.length,
        hasNext: endIndex < filteredRequests.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await hotelService.getRequestById(parseInt(req.params.id));
    if (request) {
      res.json({ request });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new request
router.post('/', async (req, res) => {
  try {
    const { guestName, roomNumber, title, department, priority, description } = req.body;
    
    // Validate required fields
    if (!guestName || !roomNumber || !title || !department) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create new request
    const newRequest = await hotelService.createRequest({
      guestName,
      roomNumber,
      title,
      department,
      priority: priority || 'MEDIUM',
      description: description || '',
      status: 'PENDING'
    });
    
    // Send notification to relevant department
    // In a real implementation, this would send push notifications
    console.log(`New request created for ${department}: ${title}`);
    
    res.status(201).json({ request: newRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update request status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const updatedRequest = await hotelService.updateRequestStatus(parseInt(req.params.id), status);
    
    if (updatedRequest) {
      // Log activity
      await hotelService.logActivity({
        type: 'request',
        title: `Request ${status.toLowerCase()}`,
        description: `${updatedRequest.guestName} - ${updatedRequest.title} (${updatedRequest.department})`,
        timestamp: new Date().toISOString(),
        status
      });
      
      // Send notification about status change
      console.log(`Request ${req.params.id} status updated to ${status}`);
      
      res.json({ request: updatedRequest });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign request to staff member
router.put('/:id/assign', async (req, res) => {
  try {
    const { staffId } = req.body;
    
    if (!staffId) {
      return res.status(400).json({ error: 'Missing staff ID' });
    }
    
    const assignedRequest = await hotelService.assignRequestToStaff(parseInt(req.params.id), parseInt(staffId));
    
    if (assignedRequest) {
      res.json({ request: assignedRequest });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a request
router.post('/:id/comments', async (req, res) => {
  try {
    const { comment, staffId } = req.body;
    
    if (!comment || !staffId) {
      return res.status(400).json({ error: 'Missing comment or staff ID' });
    }
    
    const updatedRequest = await hotelService.addCommentToRequest(parseInt(req.params.id), {
      comment,
      staffId,
      timestamp: new Date().toISOString()
    });
    
    if (updatedRequest) {
      res.json({ request: updatedRequest });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;