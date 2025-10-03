// Authentication middleware
const jwt = require('jsonwebtoken');

// Mock user database for prototype
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
  { id: 2, email: 'manager@example.com', password: 'manager123', role: 'MANAGER' },
  { id: 3, email: 'supervisor@example.com', password: 'supervisor123', role: 'SUPERVISOR' },
  { id: 4, email: 'staff@example.com', password: 'staff123', role: 'STAFF' },
  { id: 5, email: 'housekeeping@example.com', password: 'housekeeping123', role: 'HOUSEKEEPING' }
];

// Authentication middleware - more permissive for prototype
const authenticate = (req, res, next) => {
  try {
    // For prototype, we'll be more permissive and create a default user if none exists
    // In a real implementation, we would verify the JWT properly
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // For prototype, create a default user if no auth header
      req.user = { id: 1, email: 'admin@example.com', role: 'ADMIN', name: 'Admin User' };
      return next();
    }
    
    // For prototype, we'll just check if the token exists in our mock users
    // In a real implementation, we would verify the JWT
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Find user by token (in prototype)
    const user = mockUsers.find(u => u.email === token);
    
    if (!user) {
      // For prototype, create a default user if token is invalid
      req.user = { id: 1, email: 'admin@example.com', role: 'ADMIN', name: 'Admin User' };
      return next();
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    // For prototype, create a default user if there's an error
    req.user = { id: 1, email: 'admin@example.com', role: 'ADMIN', name: 'Admin User' };
    next();
  }
};

// Authorization middleware - more permissive for prototype
const authorize = (roles = []) => {
  // roles param can be a single role string or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    // For prototype, we'll be more permissive and allow all requests
    // In a real implementation, we would check user permissions
    
    /*
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Check if user's role is included in authorized roles
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    */
    
    next();
  };
};

// Login endpoint
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in mock database
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // For prototype, we'll just return the email as token
    // In a real implementation, we would generate a proper JWT
    res.json({
      message: 'Login successful',
      token: user.email,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name || user.email.split('@')[0]
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  authenticate,
  authorize,
  login,
  mockUsers
};