# 🏨 HotelOps Vercel Deployment Guide

This guide explains how to deploy the HotelOps application to Vercel.

## 🚀 Quick Deployment

### Method 1: Using the Deployment Script
```bash
cd /Users/test/startups/hotelmanagement/hotel-ops-app
./deploy-to-vercel.sh
```

### Method 2: Manual Deployment
```bash
cd /Users/test/startups/hotelmanagement/hotel-ops-app
vercel --prod
```

## 📋 Prerequisites

1. **Vercel CLI**: Install the Vercel command-line interface
   ```bash
   npm install -g vercel
   ```

2. **Node.js**: Ensure Node.js is installed (v14 or higher)
   ```bash
   node --version
   ```

3. **Project Structure**: Ensure the following files exist:
   - `package.json` (root)
   - `frontend/package.json`
   - `backend/package.json`
   - `vercel.json` (root configuration)

## 🛠 Deployment Process

### 1. Authentication
First, login to your Vercel account:
```bash
vercel login
```

### 2. Project Setup
The deployment will automatically detect:
- **Frontend**: Next.js application in the `frontend/` directory
- **Backend**: Node.js API server in the `backend/` directory

### 3. Environment Variables
Vercel will automatically detect and configure environment variables. If you need to set custom environment variables:

1. Visit the Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add any required variables

Common variables for HotelOps:
- `NODE_ENV`: production
- `PORT`: 3001 (for backend)
- `DATABASE_URL`: Your database connection string (if using external DB)

### 4. Deployment Configuration

The `vercel.json` file in the root directory configures:
- **Build Process**: Separate builds for frontend and backend
- **Routing**: API routes directed to backend, others to frontend
- **File Inclusion**: Ensures all necessary files are included

### 5. Frontend Configuration
The `frontend/vercel.json` file configures:
- **Next.js Build**: Uses the official Vercel Next.js builder
- **Static Assets**: Includes public assets in the build

### 6. Backend Configuration
The `backend/vercel.json` file configures:
- **Node.js Build**: Uses the official Vercel Node.js builder
- **API Routes**: Directs `/api/*` routes to the backend server

## 🌐 Access Points

After deployment, your application will be available at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api/*`

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are listed in package.json
   - Check for syntax errors in configuration files
   - Verify Node.js version compatibility

2. **Runtime Errors**
   - Check Vercel logs: `vercel logs your-project.vercel.app`
   - Verify environment variables are correctly set
   - Ensure database connections are properly configured

3. **Routing Issues**
   - Check `vercel.json` routing configuration
   - Verify API routes are correctly mapped
   - Test routes locally before deployment

### Local Testing

Before deploying, test locally:
```bash
# Test frontend
cd frontend
npm run dev

# Test backend
cd ../backend
npm run dev
```

## 🔄 Redeployment

To redeploy after changes:
```bash
cd /Users/test/startups/hotelmanagement/hotel-ops-app
vercel --prod
```

Vercel will automatically detect changes and rebuild only the affected parts.

## 📊 Monitoring

After deployment, monitor your application:
- **Vercel Dashboard**: View logs, metrics, and performance
- **Analytics**: Track usage and performance metrics
- **Error Tracking**: Monitor for runtime errors

## 🛡 Security Considerations

1. **Environment Variables**: Store secrets in Vercel's environment variables
2. **CORS**: Configure CORS settings appropriately
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Authentication**: Ensure proper authentication for sensitive endpoints

## 💡 Tips

1. **Custom Domains**: Configure custom domains in Vercel dashboard
2. **Preview Deployments**: Use Vercel's preview deployments for testing
3. **Rollbacks**: Use Vercel's rollback feature if needed
4. **Caching**: Configure caching headers for static assets

## 🆘 Support

For deployment issues:
1. Check Vercel documentation: https://vercel.com/docs
2. View deployment logs: `vercel logs`
3. Contact Vercel support if needed