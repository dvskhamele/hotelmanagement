const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Log the current directory
console.log('Current directory:', __dirname);
console.log('Frontend path:', path.join(__dirname, 'frontend/out'));
console.log('Index file exists:', fs.existsSync(path.join(__dirname, 'frontend/out/index.html')));

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, 'frontend/out')));

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend/out/index.html');
  console.log('Serving index file from:', indexPath);
  console.log('Index file exists:', fs.existsSync(indexPath));
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});