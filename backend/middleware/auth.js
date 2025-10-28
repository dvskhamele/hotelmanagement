// Authentication middleware
import jwt from 'jsonwebtoken';

// Define SEBI-compliant user roles
const UserRoles = {
  ADMIN: 'ADMIN',
  ONBOARDING_AGENT: 'ONBOARDING_AGENT',
  RESEARCH_ANALYST: 'RESEARCH_ANALYST',
  COMPLIANCE_OFFICER: 'COMPLIANCE_OFFICER'
};

// Mock user database for prototype - Updated for AdvisorX CRM with SEBI-compliant roles
const mockUsers = [
  { id: 1, email: 'admin@advisorx.com', password: 'admin123', role: UserRoles.ADMIN },
  { id: 2, email: 'onboarding@advisorx.com', password: 'onboarding123', role: UserRoles.ONBOARDING_AGENT },
  { id: 3, email: 'analyst@advisorx.com', password: 'analyst123', role: UserRoles.RESEARCH_ANALYST },
  { id: 4, email: 'compliance@advisorx.com', password: 'compliance123', role: UserRoles.COMPLIANCE_OFFICER },
  { id: 5, email: 'telecaller@advisorx.com', password: 'telecaller123', role: UserRoles.ONBOARDING_AGENT }
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

// Authorization middleware - SEBI-compliant role-based access control
const authorize = (roles = []) => {
  // roles param can be a single role string or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Check if user's role is included in authorized roles
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Insufficient permissions. Required roles: ${roles.join(', ')}` });
    }
    
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

export {
  authenticate,
  authorize,
  login,
  mockUsers,
  UserRoles
};