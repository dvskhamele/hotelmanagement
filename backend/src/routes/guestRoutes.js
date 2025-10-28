const express = require('express');
const router = express.Router();
const QRCodeService = require('../services/qrCodeService');
const HotelService = require('../services/hotelService');

// Initialize services
let qrCodeService;
let hotelService;

// Middleware to initialize services
router.use(async (req, res, next) => {
  if (!qrCodeService) {
    qrCodeService = new QRCodeService();
  }
  if (!hotelService) {
    hotelService = new HotelService();
    await hotelService.init();
  }
  next();
});

// Serve guest request portal page
router.get('/', (req, res) => {
  res.sendFile('guest-request.html', { root: 'public' });
});

// Generate QR code for a specific room
router.get('/qr/room/:roomNumber', async (req, res) => {
  try {
    const { roomNumber } = req.params;
    
    // Validate room number
    if (!roomNumber) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing room number' 
      });
    }
    
    const result = await qrCodeService.generateRoomQRCode(roomNumber);
    
    if (result.success) {
      res.json({ 
        success: true, 
        qrCode: result.qrCode,
        url: result.url
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

// Generate general QR code for guest requests
router.get('/qr/general', async (req, res) => {
  try {
    const result = await qrCodeService.generateGeneralQRCode();
    
    if (result.success) {
      res.json({ 
        success: true, 
        qrCode: result.qrCode,
        url: result.url
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

// Generate QR code for specific request type
router.get('/qr/type/:requestType', async (req, res) => {
  try {
    const { requestType } = req.params;
    
    // Validate request type
    if (!requestType) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing request type' 
      });
    }
    
    const result = await qrCodeService.generateRequestTypeQRCode(requestType);
    
    if (result.success) {
      res.json({ 
        success: true, 
        qrCode: result.qrCode,
        url: result.url
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

// Submit guest request
router.post('/submit', async (req, res) => {
  try {
    const { guestName, roomNumber, title, description, requestType } = req.body;
    
    // Validate required fields
    if (!guestName || !roomNumber || !title) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    // Create request in the system
    const newRequest = await hotelService.createRequest({
      guestName,
      roomNumber,
      title,
      description: description || '',
      department: hotelService.routeRequestToDepartment(requestType || 'other'),
      priority: 'MEDIUM',
      status: 'PENDING'
    });
    
    // Log activity
    await hotelService.logActivity({
      type: 'guest_request',
      title: 'New guest request',
      description: `${guestName} - ${title} (Room ${roomNumber})`,
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Request submitted successfully',
      request: newRequest
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get request types for guest portal
router.get('/types', (req, res) => {
  // In a real implementation, this would come from the database
  // For prototype, we'll return mock data
  const requestTypes = [
    { id: 'cleaning', name: 'Housekeeping', icon: 'bed' },
    { id: 'maintenance', name: 'Maintenance', icon: 'wrench' },
    { id: 'room_service', name: 'Room Service', icon: 'utensils' },
    { id: 'amenity', name: 'Amenity Request', icon: 'spa' },
    { id: 'other', name: 'Other Request', icon: 'question-circle' }
  ];
  
  res.json({ 
    success: true, 
    requestTypes 
  });
});

module.exports = router;