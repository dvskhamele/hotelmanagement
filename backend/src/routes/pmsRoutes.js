const express = require('express');
const router = express.Router();
const PMSIntegrationService = require('../services/pmsIntegrationService');

// Initialize PMS service
let pmsService;

// Middleware to initialize PMS service
router.use((req, res, next) => {
  // In a real implementation, we would get these from environment variables
  const apiUrl = process.env.PMS_API_URL || 'https://api.example-pms.com';
  const apiKey = process.env.PMS_API_KEY || 'mock-api-key';
  
  if (!pmsService) {
    pmsService = new PMSIntegrationService(apiUrl, apiKey);
  }
  next();
});

// Sync room statuses with PMS
router.post('/sync/rooms', async (req, res) => {
  try {
    const result = await pmsService.syncRoomStatuses();
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: result.message,
        updatedRooms: result.updatedRooms || 0
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get room status from PMS
router.get('/rooms/:id', async (req, res) => {
  try {
    const result = await pmsService.getRoomStatus(parseInt(req.params.id));
    
    if (result.success) {
      res.json({ 
        success: true, 
        room: result.room
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update room status in PMS
router.put('/rooms/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing status parameter' 
      });
    }
    
    const result = await pmsService.updateRoomStatus(parseInt(req.params.id), status);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: result.message
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get guest requests from PMS
router.get('/requests', async (req, res) => {
  try {
    const result = await pmsService.getGuestRequests();
    
    if (result.success) {
      res.json({ 
        success: true, 
        requests: result.requests
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Create guest request in PMS
router.post('/requests', async (req, res) => {
  try {
    const { guestName, roomNumber, title, department, priority } = req.body;
    
    // Validate required fields
    if (!guestName || !roomNumber || !title || !department) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    const requestData = {
      guestName,
      roomNumber,
      title,
      department,
      priority: priority || 'MEDIUM'
    };
    
    const result = await pmsService.createGuestRequest(requestData);
    
    if (result.success) {
      res.status(201).json({ 
        success: true, 
        message: result.message,
        requestId: result.requestId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update guest request status in PMS
router.put('/requests/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing status parameter' 
      });
    }
    
    const result = await pmsService.updateGuestRequestStatus(parseInt(req.params.id), status);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: result.message
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;