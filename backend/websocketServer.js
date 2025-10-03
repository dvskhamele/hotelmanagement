// WebSocket server for real-time updates
const WebSocket = require('ws');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // Store connected clients with their roles
    
    this.initialize();
  }
  
  initialize() {
    this.wss.on('connection', (ws, req) => {
      // Extract user info from request (in real implementation, verify JWT)
      const userId = req.headers['user-id'] || 'anonymous';
      const userRole = req.headers['user-role'] || 'guest';
      
      // Store client connection
      this.clients.set(ws, { userId, userRole });
      
      console.log(`New client connected: ${userId} (${userRole})`);
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to Hotel Operations WebSocket server'
      }));
      
      // Handle incoming messages
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleMessage(ws, data);
        } catch (error) {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Invalid message format'
          }));
        }
      });
      
      // Handle client disconnect
      ws.on('close', () => {
        this.clients.delete(ws);
        console.log(`Client disconnected: ${userId} (${userRole})`);
      });
    });
  }
  
  handleMessage(ws, data) {
    switch (data.type) {
      case 'subscribe':
        // Subscribe to specific events
        if (!ws.subscriptions) {
          ws.subscriptions = [];
        }
        ws.subscriptions.push(data.channel);
        ws.send(JSON.stringify({
          type: 'subscription',
          message: `Subscribed to ${data.channel}`,
          channel: data.channel
        }));
        break;
        
      default:
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Unknown message type'
        }));
    }
  }
  
  // Broadcast message to all clients
  broadcast(message) {
    const data = typeof message === 'string' ? message : JSON.stringify(message);
    
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
  
  // Send message to specific clients based on role
  sendToRole(role, message) {
    const data = typeof message === 'string' ? message : JSON.stringify(message);
    
    this.clients.forEach((clientInfo, client) => {
      if (clientInfo.userRole === role && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
  
  // Send message to specific user
  sendToUser(userId, message) {
    const data = typeof message === 'string' ? message : JSON.stringify(message);
    
    this.clients.forEach((clientInfo, client) => {
      if (clientInfo.userId === userId && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
  
  // Notify about room status changes
  notifyRoomStatusChange(roomId, newStatus, updatedBy) {
    const message = {
      type: 'room_status_change',
      roomId,
      status: newStatus,
      updatedBy,
      timestamp: new Date().toISOString()
    };
    
    // Send to housekeeping staff
    this.sendToRole('housekeeping', message);
    
    // Broadcast to all for dashboard updates
    this.broadcast(message);
  }
  
  // Notify about new requests
  notifyNewRequest(request) {
    const message = {
      type: 'new_request',
      request,
      timestamp: new Date().toISOString()
    };
    
    // Send to relevant department
    this.sendToRole(request.department.toLowerCase(), message);
    
    // Broadcast to supervisors and managers
    this.sendToRole('supervisor', message);
    this.sendToRole('manager', message);
  }
  
  // Notify about request status changes
  notifyRequestStatusChange(requestId, newStatus, updatedBy) {
    const message = {
      type: 'request_status_change',
      requestId,
      status: newStatus,
      updatedBy,
      timestamp: new Date().toISOString()
    };
    
    // Broadcast to all for dashboard updates
    this.broadcast(message);
  }
}

module.exports = WebSocketServer;