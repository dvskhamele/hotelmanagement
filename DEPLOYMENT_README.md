# AdvisorX CRM - Deployment Guide

## 🚀 Quick Deployment to Vercel

To deploy AdvisorX CRM to Vercel, simply run:

```bash
cd /Users/test/startups/advisorymanagement
./deploy-advisorx-crm.sh
```

## 📁 Project Structure

The AdvisorX CRM application has been pre-built and exported as static files in the `frontend/out` directory. This includes:

- `index.html` - Main landing page
- `showcase.html` - AdvisorX CRM showcase page
- `dashboard.html` - Dashboard page
- All required CSS, JavaScript, and asset files

## 🛠 Deployment Process

### Prerequisites
1. Vercel CLI installed (`npm install -g vercel`)
2. Internet connection
3. Vercel account

### Deployment Steps
1. Run the deployment script:
   ```bash
   ./deploy-advisorx-crm.sh
   ```

2. The script will:
   - Check for required files
   - Authenticate with Vercel (if needed)
   - Deploy the static files to Vercel

3. After deployment, you'll receive a URL where your AdvisorX CRM is accessible

## 🔧 Manual Deployment (Alternative)

If you prefer to deploy manually:

1. Navigate to the static files directory:
   ```bash
   cd /Users/test/startups/advisorymanagement/frontend/out
   ```

2. Deploy using Vercel CLI:
   ```bash
   vercel --prod
   ```

## 🌐 Accessing the Deployed Application

After successful deployment, your AdvisorX CRM will be available at a URL provided by Vercel (e.g., `https://advisorx-crm-xxxx.vercel.app`).

Key pages:
- Main landing page: `/` (index.html)
- AdvisorX showcase: `/showcase.html`
- Dashboard: `/dashboard.html`

## 📞 Support

For deployment issues, please contact our support team.