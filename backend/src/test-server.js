const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Simple test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});