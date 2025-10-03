const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, 'frontend/out')));

// Proxy API requests to the backend server
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true,
}));

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
  console.log(`Backend API available at http://localhost:${PORT}/api`);
});