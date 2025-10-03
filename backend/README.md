# Hotel Operations Management Backend

## Deployment Options

This backend is designed to work in multiple environments:

1. **Traditional Server** (current setup)
2. **Serverless** (Vercel, AWS Lambda, Google Cloud Functions)
3. **Containerized** (Docker, Kubernetes)

## Traditional Server Deployment

```bash
# Install dependencies
npm install

# Start server
npm start
```

The server will run on port 3001 by default.

## Serverless Deployment

### Vercel (Recommended for Edge Functions)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`
3. Deploy: `vercel --prod`

The `vercel.json` file configures the edge functions for optimal performance.

### AWS Lambda

1. Install AWS CLI and configure credentials
2. Install SAM CLI
3. Create a deployment package
4. Deploy using SAM template

### Google Cloud Functions

1. Install Google Cloud SDK
2. Authenticate: `gcloud auth login`
3. Deploy functions individually or as a group

## Database Options

The backend supports multiple database types:

1. **File-based** (default for development)
2. **PostgreSQL**
3. **MySQL**
4. **MongoDB**
5. **Supabase** (recommended for production/serverless)

### Supabase Setup (Recommended for Production)

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your Project URL and API Key from the Supabase dashboard
4. Set the following environment variables:
   ```
   DB_TYPE=supabase
   DATABASE_URL=your-supabase-project-url
   SUPABASE_KEY=your-supabase-anon-key
   ```

## Environment Variables

Create a `.env` file with the following variables:

```
NODE_ENV=production
PORT=3001
DB_TYPE=supabase
DATABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
JWT_SECRET=your-secret-key
CORS_ORIGIN=*
```

## Cost Optimization with Serverless and Supabase

Using Vercel Edge Functions and Supabase offers several cost optimization benefits:

1. **Pay-per-use**: Only pay for actual requests, not idle time
2. **Auto-scaling**: Automatically scales to handle traffic
3. **Global distribution**: Built-in CDN-like distribution with Edge Functions
4. **Supabase free tier**: Generous free tier for small to medium applications
5. **No server management**: Reduced operational overhead
6. **Database scaling**: Supabase automatically handles database scaling

## API Endpoints

All endpoints are available at `/api/*`:

- `POST /api/auth/login` - User authentication
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/activity` - Recent activity
- `GET /api/rooms` - List all rooms
- `PUT /api/rooms/:id/status` - Update room status
- `GET /api/staff` - List all staff
- `PUT /api/staff/:id/status` - Update staff status
- `GET /api/requests` - List all requests
- `PUT /api/requests/:id/status` - Update request status
- `GET /api/inventory` - List inventory items
- `PUT /api/inventory/:id/quantity` - Update inventory quantity
- `GET /api/departments` - List departments

## Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev
```