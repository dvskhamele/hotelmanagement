# Hotel Operations Management System

A beautiful, fully functional hotel operations management system built with Next.js and Netlify Edge Functions.

## Features

- Dashboard with key metrics and visualizations
- Room status management
- Guest request tracking
- Staff management
- Inventory tracking
- Department coordination
- Analytics and reporting

## Deployment Instructions

### Prerequisites

1. A GitHub account (you're already logged in)
2. A Netlify account

### Automated Deployment with Netlify

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/log in
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub account
   - Select your `hotel-ops-app` repository
   - Configure the deployment settings:
     - **Build command**: `cd frontend && npm run build`
     - **Publish directory**: `frontend/.next`
   - Click "Deploy site"

### Manual Deployment Steps

If you prefer to deploy manually:

1. **Clone the repository**
   ```bash
   git clone https://github.com/dvskhamele/hotel-ops-app.git
   cd hotel-ops-app
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify**
   - Drag and drop the `frontend/.next` directory to Netlify's deploy interface
   - Or use Netlify CLI: `netlify deploy --prod`

### How It Works

This application uses:
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Netlify Edge Functions (serverless)
- **Data**: In-memory mock data that persists in localStorage
- **Authentication**: Mock authentication for demo purposes

All data is stored in the browser's localStorage, so no database is required. This makes the application perfect for demos and prototypes.

### Customization

To customize the application:
1. Modify the Edge Functions in `netlify/edge-functions/` to change API responses
2. Update the frontend components in `frontend/src/app/` to change the UI
3. Modify the mock data in the Edge Functions to simulate different scenarios

### Support

For any issues or questions, please open an issue on the GitHub repository.