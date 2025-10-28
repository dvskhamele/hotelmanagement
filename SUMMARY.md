# Hotel Operations Management System - Prototype

This prototype implements a comprehensive hotel operations management system with the following components:

## Backend (Node.js/Express)
- REST API with endpoints for rooms, requests, and authentication
- WebSocket server for real-time updates
- Mock PMS integration service
- User authentication and authorization
- Database schema with Prisma (models for users, guests, rooms, requests, departments, etc.)

## Frontend (Next.js/React)
- Dashboard with overview statistics
- Room management interface
- Request management system
- Analytics dashboard with mock charts
- Responsive design with TailwindCSS

## Mobile App (React Native/Expo)
- Staff login interface
- Room status management
- Request handling
- Tab-based navigation

## Key Features Implemented
1. Guest Request Management
2. Housekeeping & Room Status Management
3. Department Coordination
4. PMS Integration (mock)
5. Real-time Updates via WebSocket
6. Analytics Dashboard

## Project Structure
```
hotel-ops-app/
├── backend/
│   ├── services/
│   ├── middleware/
│   ├── prisma/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── ...
│   └── ...
├── mobile/
│   ├── App.js
│   ├── RoomStatusScreen.js
│   ├── RequestManagementScreen.js
│   └── ...
├── README.md
└── LICENSE
```

## How to Run

1. Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Mobile:
   ```bash
   cd mobile
   npm install
   npm start
   ```

## Notes
- This is a prototype implementation and not production-ready
- Database integration with Prisma needs to be fully implemented
- Push notifications are planned but not yet implemented
- PMS integration is currently mocked and needs to be connected to actual PMS APIs