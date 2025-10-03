// Serverless entry point for Vercel, AWS Lambda, etc.
const { createHandler, initService } = require('./handlers/apiHandlers');

// Export individual handlers for serverless platforms
// Each handler can be deployed as a separate function

// Authentication endpoints
exports.auth = require('./handlers/apiHandlers').authHandler;

// Dashboard endpoints
exports.dashboardStats = require('./handlers/apiHandlers').dashboardStatsHandler;
exports.dashboardActivity = require('./handlers/apiHandlers').dashboardActivityHandler;

// Rooms endpoints
exports.rooms = require('./handlers/apiHandlers').roomsHandler;
exports.roomStatus = require('./handlers/apiHandlers').roomStatusHandler;

// Staff endpoints
exports.staff = require('./handlers/apiHandlers').staffHandler;
exports.staffStatus = require('./handlers/apiHandlers').staffStatusHandler;

// Requests endpoints
exports.requests = require('./handlers/apiHandlers').requestsHandler;
exports.requestStatus = require('./handlers/apiHandlers').requestStatusHandler;

// Inventory endpoints
exports.inventory = require('./handlers/apiHandlers').inventoryHandler;
exports.inventoryQuantity = require('./handlers/apiHandlers').inventoryQuantityHandler;

// Departments endpoints
exports.departments = require('./handlers/apiHandlers').departmentsHandler;

// Initialize service on cold start
exports.init = async () => {
  await initService();
  return { success: true };
};