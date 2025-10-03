# SuperHealth Hospital Management System

A comprehensive hospital management system built with Next.js 13+ and Tailwind CSS.

## Features

- Patient Management
- Room & Bed Management
- Doctor Scheduling
- Staff Management
- Pharmacy Management
- Insurance Claims Processing
- VIP Patient Services
- Emergency Department Coordination
- Waiting Time Optimization
- Analytics & Reporting

## Tech Stack

- Next.js 15.1.0 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Recharts for data visualization

## Deployment Instructions

### Deploy to Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your Git repository (GitHub, GitLab, or Bitbucket)
3. Set the root directory to `/frontend`
4. Use the default build settings:
   - Build Command: `next build`
   - Output Directory: `.next`
5. Add environment variables if needed:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```

### Manual Deployment

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. Start the application:
```bash
npm start
```

## Development

To run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3002

## Folder Structure

```
/frontend
  /src
    /app          # Next.js App Router pages
    /components   # Reusable UI components
    /utils        # Utility functions and services
```

## Environment Variables

Create a `.env.local` file in the `/frontend` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is proprietary and confidential.