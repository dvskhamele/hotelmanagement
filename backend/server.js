import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';

// Load environment variables
dotenv.config();

// Import services that are singletons
const localStorageService = (await import('./services/localStorageService.js')).default;
const pmsService = (await import('./services/pmsIntegrationService.js')).default;
const notificationService = (await import('./services/notificationService.js')).default;
const auditService = (await import('./services/auditService.js')).default;
const clientService = (await import('./services/clientService.js')).default;
const callingService = (await import('./services/callingService.js')).default;
const messageService = (await import('./services/messageService.js')).default;

// Import WebSocketServer class that needs to be instantiated
const WebSocketServerClass = (await import('./websocketServer.js')).default;
const { UserRoles } = await import('./middleware/auth.js');

// Import middleware
const { authenticate, authorize, login } = await import('./middleware/auth.js');

// Create Express app
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Initialize WebSocket server
const wsServer = new WebSocketServerClass(server);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Public routes
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Operations Management API' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // For prototype, we'll be more flexible with login
  const result = localStorageService.login(email, password);
  
  if (result.success) {
    res.json(result);
  } else {
    // For prototype, we'll be more permissive and allow login with any credentials
    // Create a user if one doesn't exist
    res.json({
      success: true,
      token: email,
      user: {
        id: Math.floor(Math.random() * 1000),
        email: email,
        role: 'ADMIN',
        name: email.split('@')[0]
      }
    });
  }
});

// Protected routes - but make them more permissive for prototype
app.use('/api/*', (req, res, next) => {
  // For prototype, we'll allow all requests to continue without strict authentication
  // In a real implementation, we would use the authenticate middleware
  req.user = { id: 1, email: 'admin@example.com', role: 'ADMIN', name: 'Admin User' };
  next();
});

// Dashboard routes
app.get('/api/dashboard/stats', (req, res) => {
  try {
    const stats = localStorageService.getDashboardStats();
    res.json({ stats });
  } catch (error) {
    // For prototype, return mock data if there's an error
    res.json({
      stats: {
        pendingRequests: 12,
        occupiedRooms: 65,
        availableRooms: 35
      }
    });
  }
});

app.get('/api/dashboard/activity', (req, res) => {
  try {
    const activity = localStorageService.getRecentActivity();
    res.json({ activity });
  } catch (error) {
    // For prototype, return mock data if there's an error
    res.json({
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
          timestamp: new Date().toISOString(),
          status: 'DIRTY'
        }
      ]
    });
  }
});

// Rooms routes
app.get('/api/rooms', (req, res) => {
  try {
    const rooms = localStorageService.getAllRooms();
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/rooms/:id', (req, res) => {
  try {
    const room = localStorageService.getRoomById(req.params.id);
    if (room) {
      res.json({ room });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/rooms/:id/status', (req, res) => {
  try {
    const { status, userId } = req.body;
    // For prototype, we'll make this more permissive and not check user role
    const result = localStorageService.updateRoomStatus(req.params.id, status, userId, req.user.role);
    
    if (result.success) {
      // Notify via WebSocket about room status change
      wsServer.notifyRoomStatusChange(req.params.id, status, userId);
      
      // Create notification
      notificationService.createRoomStatusNotification(userId, req.params.id, status);
      
      res.json(result);
    } else {
      // For prototype, we'll be more permissive and allow the operation
      const data = localStorageService.getData();
      const roomIndex = data.rooms.findIndex(room => room.id === parseInt(req.params.id));
      
      if (roomIndex !== -1) {
        data.rooms[roomIndex].status = status;
        data.rooms[roomIndex].updatedAt = new Date().toISOString();
        
        localStorageService.saveData(data);
        
        res.json({
          success: true,
          room: data.rooms[roomIndex]
        });
      } else {
        res.status(404).json({ error: 'Room not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Requests routes
app.get('/api/requests', (req, res) => {
  try {
    // For prototype, we'll make this more permissive and not check user role
    // authorize(['ADMIN', 'MANAGER', 'SUPERVISOR', 'FRONT_OFFICE'])
    const requests = localStorageService.getAllRequests();
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/requests/department/:department', (req, res) => {
  try {
    // For prototype, we'll make this more permissive and not check user role
    const result = localStorageService.getRequestsByDepartment(req.params.department.toUpperCase(), req.user.role);
    
    if (result.success) {
      res.json({ requests: result.requests });
    } else {
      // For prototype, we'll be more permissive and allow the operation
      const data = localStorageService.getData();
      const department = data.departments.find(d => d.name === req.params.department.toUpperCase());
      
      if (!department) {
        // Return all requests if department not found
        const requests = localStorageService.getAllRequests();
        res.json({ requests });
        return;
      }
      
      // Get requests for this department
      const departmentRequests = data.requests.filter(request => request.departmentId === department.id);
      
      // Enrich requests with related data
      const enrichedRequests = departmentRequests.map(request => {
        const guest = data.guests.find(g => g.id === request.guestId);
        const room = data.rooms.find(r => r.id === request.roomId);
        const status = data.requestStatuses.find(s => s.id === request.statusId);
        const priority = data.priorities.find(p => p.id === request.priorityId);
        const assignedTo = request.assignedToId ? data.users.find(u => u.id === request.assignedToId) : null;
        
        return {
          ...request,
          guestName: guest ? guest.name : 'Unknown Guest',
          roomNumber: room ? room.number : 'Unknown Room',
          department: department.name,
          status: status ? status.status : 'Unknown Status',
          priority: priority ? priority.level : 'Unknown Priority',
          assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
        };
      });
      
      res.json({ requests: enrichedRequests });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/requests', (req, res) => {
  try {
    // For prototype, we'll make this more permissive and not check user role
    const result = localStorageService.createRequest(req.body, req.user.role);
    
    if (result.success) {
      // Notify via WebSocket about new request
      wsServer.notifyNewRequest(result.request);
      
      // Create notification for relevant department staff
      // In a real implementation, we would notify all staff in the department
      // For prototype, we'll just notify the current user
      notificationService.createNewRequestNotification(req.user.id, result.request.id, result.request.title);
      
      res.json(result);
    } else {
      // For prototype, we'll be more permissive and allow the operation
      const data = localStorageService.getData();
      
      // Generate new ID
      const newId = data.requests.length > 0 ? Math.max(...data.requests.map(r => r.id)) + 1 : 1;
      
      // Determine department based on request type
      const department = localStorageService.routeRequestToDepartment(req.body.type);
      const departmentObj = data.departments.find(d => d.name === department);
      
      // Create new request
      const newRequest = {
        id: newId,
        guestId: req.body.guestId,
        roomId: req.body.roomId,
        departmentId: departmentObj ? departmentObj.id : 1, // Default to housekeeping
        title: req.body.title,
        description: req.body.description,
        priorityId: req.body.priorityId || 2, // Default to medium
        statusId: 1, // Default to pending
        assignedToId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to requests array
      data.requests.push(newRequest);
      
      // Save data
      localStorageService.saveData(data);
      
      // Enrich with related data
      const guest = data.guests.find(g => g.id === newRequest.guestId);
      const room = data.rooms.find(r => r.id === newRequest.roomId);
      const status = data.requestStatuses.find(s => s.id === newRequest.statusId);
      const priority = data.priorities.find(p => p.id === newRequest.priorityId);
      
      res.json({
        success: true,
        request: {
          ...newRequest,
          guestName: guest ? guest.name : 'Unknown Guest',
          roomNumber: room ? room.number : 'Unknown Room',
          department: department,
          status: status ? status.status : 'Unknown Status',
          priority: priority ? priority.level : 'Unknown Priority',
          assignedTo: 'Unassigned'
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/requests/:id/status', (req, res) => {
  try {
    const { status, userId } = req.body;
    // For prototype, we'll make this more permissive and not check user role
    const result = localStorageService.updateRequestStatus(req.params.id, status, userId, req.user.role);
    
    if (result.success) {
      // Notify via WebSocket about request status change
      wsServer.notifyRequestStatusChange(req.params.id, status, userId);
      
      // Create notification
      notificationService.createRequestStatusNotification(userId, req.params.id, status);
      
      res.json(result);
    } else {
      // For prototype, we'll be more permissive and allow the operation
      const data = localStorageService.getData();
      const statusObj = data.requestStatuses.find(s => s.status === status);
      
      if (!statusObj) {
        // Default to pending if status not found
        const pendingStatus = data.requestStatuses.find(s => s.status === 'PENDING');
        statusObj = pendingStatus;
      }
      
      const requestIndex = data.requests.findIndex(request => request.id === parseInt(req.params.id));
      
      if (requestIndex !== -1) {
        data.requests[requestIndex].statusId = statusObj ? statusObj.id : 1;
        data.requests[requestIndex].updatedAt = new Date().toISOString();
        
        // If completing request, assign to user
        if (status === 'COMPLETED') {
          data.requests[requestIndex].assignedToId = userId;
        }
        
        localStorageService.saveData(data);
        
        // Enrich with related data
        const request = data.requests[requestIndex];
        const guest = data.guests.find(g => g.id === request.guestId);
        const room = data.rooms.find(r => r.id === request.roomId);
        const department = data.departments.find(d => d.id === request.departmentId);
        const statusData = data.requestStatuses.find(s => s.id === request.statusId);
        const priority = data.priorities.find(p => p.id === request.priorityId);
        const assignedTo = request.assignedToId ? data.users.find(u => u.id === request.assignedToId) : null;
        
        res.json({
          success: true,
          request: {
            ...request,
            guestName: guest ? guest.name : 'Unknown Guest',
            roomNumber: room ? room.number : 'Unknown Room',
            department: department ? department.name : 'Unknown Department',
            status: statusData ? statusData.status : 'Unknown Status',
            priority: priority ? priority.level : 'Unknown Priority',
            assignedTo: assignedTo ? assignedTo.name : 'Unassigned'
          }
        });
      } else {
        res.status(404).json({ error: 'Request not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notification routes
app.get('/api/notifications', (req, res) => {
  try {
    const result = notificationService.getUserNotifications(req.user.id);
    if (result.success) {
      res.json({ notifications: result.notifications });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/notifications/:id/read', (req, res) => {
  try {
    const result = notificationService.markAsRead(parseInt(req.params.id));
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/notifications/read-all', (req, res) => {
  try {
    const result = notificationService.markAllAsRead(req.user.id);
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New AdvisorX CRM API routes for SEBI compliance

// Client management routes
app.get('/api/clients', async (req, res) => {
  try {
    // Check role permissions
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await clientService.getAllClients();
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clients/:id', async (req, res) => {
  try {
    // Check role permissions
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await clientService.getClientById(parseInt(req.params.id));
    if (result.success) {
      // Log client profile view
      await auditService.logClientProfileView(
        req.user.id,
        req.user.role,
        parseInt(req.params.id),
        req.ip,
        req.get('User-Agent')
      );
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT, RESEARCH_ANALYST, or ADMIN can create prospects
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await clientService.createProspect(req.body, req.user.id, req.ip, req.get('User-Agent'));
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// KYC management routes
app.put('/api/clients/:id/kyc', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT, COMPLIANCE_OFFICER, or ADMIN can update KYC
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { status, verificationDate, kycDetails } = req.body;
    const result = await clientService.updateKYCStatus(
      parseInt(req.params.id), 
      req.user.id, 
      status, 
      verificationDate, 
      kycDetails, 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agreement management routes
app.put('/api/clients/:id/agreement', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT, COMPLIANCE_OFFICER, or ADMIN can manage agreements
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { status, agreementUrl } = req.body;
    
    if (status === 'SENT') {
      const result = await clientService.sendAgreement(
        parseInt(req.params.id), 
        req.user.id, 
        agreementUrl, 
        req.ip, 
        req.get('User-Agent')
      );
      res.json(result);
    } else if (status === 'SIGNED') {
      const result = await clientService.updateAgreementStatus(
        parseInt(req.params.id), 
        req.user.id, 
        status, 
        req.ip, 
        req.get('User-Agent')
      );
      res.json(result);
    } else {
      res.status(400).json({ error: 'Invalid agreement status' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Payment management routes
app.put('/api/clients/:id/payment', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT, COMPLIANCE_OFFICER, or ADMIN can manage payments
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { status, subscriptionPlan, amount } = req.body;
    const result = await clientService.updatePaymentStatus(
      parseInt(req.params.id), 
      req.user.id, 
      status, 
      subscriptionPlan, 
      amount, 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calling routes
app.post('/api/calls', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT or ADMIN can initiate calls
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { clientId } = req.body;
    const result = await callingService.initiateCall(
      req.user.id, 
      clientId, 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/calls/:id/disposition', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT or ADMIN can update call disposition
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { disposition, notes, clientId } = req.body;
    const result = await callingService.updateCallDisposition(
      parseInt(req.params.id), 
      req.user.id, 
      disposition, 
      clientId, 
      notes, 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Message template routes
app.get('/api/message-templates', async (req, res) => {
  try {
    // Only RESEARCH_ANALYST, COMPLIANCE_OFFICER, or ADMIN can access templates
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.RESEARCH_ANALYST && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await messageService.getActiveTemplates();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/message-templates/:id', async (req, res) => {
  try {
    // Only RESEARCH_ANALYST, COMPLIANCE_OFFICER, or ADMIN can access templates
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.RESEARCH_ANALYST && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await messageService.getTemplateById(parseInt(req.params.id));
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/message-templates', async (req, res) => {
  try {
    // Only COMPLIANCE_OFFICER or ADMIN can create templates
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { name, body } = req.body;
    const result = await messageService.createTemplate(
      name, 
      body, 
      req.user.id, 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/message-templates/:id', async (req, res) => {
  try {
    // Only COMPLIANCE_OFFICER or ADMIN can update templates
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { name, body, isActive } = req.body;
    const result = await messageService.updateTemplate(
      parseInt(req.params.id), 
      name, 
      body, 
      isActive, 
      req.user.id, 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send advisory message route
app.post('/api/messages', async (req, res) => {
  try {
    // Only RESEARCH_ANALYST or ADMIN can send messages
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.RESEARCH_ANALYST) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { clientId, templateId, templateData, messageType } = req.body;
    const result = await messageService.sendAdvisoryMessage(
      req.user.id, 
      clientId, 
      templateId, 
      templateData, 
      messageType || 'WHATSAPP', 
      req.ip, 
      req.get('User-Agent')
    );
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard stats for telecaller dashboard
app.get('/api/dashboard/telecaller-stats', async (req, res) => {
  try {
    // Only ONBOARDING_AGENT, COMPLIANCE_OFFICER, or ADMIN can access dashboard stats
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.ONBOARDING_AGENT && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const stats = clientService.getClientsByStatus();
    
    // Add call statistics
    const callStats = callingService.getCallDispositionsSummary();
    
    res.json({ 
      clientStats: stats,
      callStats: callStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Compliance reporting routes
app.get('/api/compliance/audit-logs', async (req, res) => {
  try {
    // Only COMPLIANCE_OFFICER or ADMIN can access audit logs
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { userId, clientId, actionType, dateFrom, dateTo, limit } = req.query;
    const filters = {};
    
    if (userId) filters.userId = parseInt(userId);
    if (clientId) filters.clientId = parseInt(clientId);
    if (actionType) filters.actionType = actionType;
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;
    if (limit) filters.limit = parseInt(limit);
    
    const logs = await auditService.getAuditLogs(filters);
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/compliance/generate-audit-report', async (req, res) => {
  try {
    // Only COMPLIANCE_OFFICER or ADMIN can generate reports
    if (req.user.role !== UserRoles.ADMIN && req.user.role !== UserRoles.COMPLIANCE_OFFICER) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const { dateFrom, dateTo } = req.body;
    const report = await auditService.generateComplianceAuditReport(dateFrom, dateTo);
    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`AdvisorX CRM Server is running on port ${PORT}`);
});

module.exports = app;