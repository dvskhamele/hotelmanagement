import express from 'express';
import serverless from 'serverless-http';

const app = express();

// Import your existing server code
import { config } from '../src/config/index.js';
import HotelService from '../src/services/hotelService.js';

// Middleware
app.use(express.json());

// Initialize service
const hotelService = new HotelService();

// API Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Operations Management API' });
});

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await hotelService.authenticate(email, password);
    
    if (result.success) {
      res.json({
        user: result.user,
        token: 'fake-jwt-token'
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = await hotelService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/activity', async (req, res) => {
  try {
    const activity = await hotelService.getRecentActivity();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the serverless function
export default serverless(app);