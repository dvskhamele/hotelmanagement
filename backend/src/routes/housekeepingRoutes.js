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

// Get all rooms with filtering options
router.get('/', async (req, res) => {
  try {
    const { status, floor, type, page = 1, limit = 50 } = req.query;
    const rooms = await hotelService.getAllRooms();
    
    // Apply filters
    let filteredRooms = rooms;
    
    if (status) {
      filteredRooms = filteredRooms.filter(r => r.status === status);
    }
    
    if (floor) {
      filteredRooms = filteredRooms.filter(r => r.floor === parseInt(floor));
    }
    
    if (type) {
      filteredRooms = filteredRooms.filter(r => r.type === type);
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRooms = filteredRooms.slice(startIndex, endIndex);
    
    res.json({
      rooms: paginatedRooms,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredRooms.length / limit),
        totalRooms: filteredRooms.length,
        hasNext: endIndex < filteredRooms.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await hotelService.getRoomById(parseInt(req.params.id));
    if (room) {
      res.json({ room });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update room status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, staffId } = req.body;
    
    // Validate status
    const validStatuses = ['CLEAN', 'DIRTY', 'INSPECTED', 'OUT_OF_ORDER'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const updatedRoom = await hotelService.updateRoomStatus(parseInt(req.params.id), status);
    
    if (updatedRoom) {
      // Log activity
      await hotelService.logActivity({
        type: 'room',
        title: 'Room status updated',
        description: `Room ${updatedRoom.number} marked as ${status}`,
        timestamp: new Date().toISOString(),
        status
      });
      
      // If status is INSPECTED, this might require supervisor approval
      // In a real implementation, we would check if supervisor approval is needed
      console.log(`Room ${req.params.id} status updated to ${status}`);
      
      res.json({ room: updatedRoom });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request supervisor inspection for a room
router.post('/:id/request-inspection', async (req, res) => {
  try {
    const { staffId, notes } = req.body;
    
    if (!staffId) {
      return res.status(400).json({ error: 'Missing staff ID' });
    }
    
    // Update room status to INSPECTED
    const updatedRoom = await hotelService.updateRoomStatus(parseInt(req.params.id), 'INSPECTED');
    
    if (updatedRoom) {
      // Add inspection request to room
      const inspectionRequest = {
        requestedBy: staffId,
        requestedAt: new Date().toISOString(),
        notes: notes || '',
        status: 'PENDING' // PENDING, APPROVED, REJECTED
      };
      
      // In a real implementation, we would store this in a separate inspection_requests collection
      // For prototype, we'll just log it
      console.log(`Inspection requested for room ${req.params.id} by staff ${staffId}`);
      
      res.json({ 
        room: updatedRoom,
        inspectionRequest
      });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve room inspection (supervisor only)
router.post('/:id/approve-inspection', async (req, res) => {
  try {
    const { supervisorId, notes } = req.body;
    
    if (!supervisorId) {
      return res.status(400).json({ error: 'Missing supervisor ID' });
    }
    
    const room = await hotelService.getRoomById(parseInt(req.params.id));
    
    if (room) {
      // In a real implementation, we would check if user is supervisor
      // For prototype, we'll just approve the inspection
      
      // Log the approval
      await hotelService.logActivity({
        type: 'inspection',
        title: 'Room inspection approved',
        description: `Room ${room.number} inspection approved by supervisor ${supervisorId}`,
        timestamp: new Date().toISOString(),
        status: 'APPROVED'
      });
      
      res.json({ 
        success: true,
        message: `Inspection for room ${room.number} approved`,
        room
      });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get housekeeping statistics
router.get('/stats/housekeeping', async (req, res) => {
  try {
    const rooms = await hotelService.getAllRooms();
    
    const stats = {
      totalRooms: rooms.length,
      cleanRooms: rooms.filter(r => r.status === 'CLEAN').length,
      dirtyRooms: rooms.filter(r => r.status === 'DIRTY').length,
      inspectedRooms: rooms.filter(r => r.status === 'INSPECTED').length,
      outOfOrderRooms: rooms.filter(r => r.status === 'OUT_OF_ORDER').length,
      occupancyRate: Math.round((rooms.filter(r => r.status !== 'CLEAN').length / rooms.length) * 100)
    };
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;