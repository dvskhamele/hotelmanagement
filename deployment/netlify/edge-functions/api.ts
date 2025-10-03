import type { Context } from "https://edge.netlify.com/";

// This is a fallback handler that can route requests to the appropriate functions
export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname;
  
  // Simple routing based on path
  if (path.startsWith("/api/auth/login")) {
    const { default: loginHandler } = await import("./auth/login.ts");
    return loginHandler(req, context);
  }
  
  if (path.startsWith("/api/dashboard/stats")) {
    const { default: statsHandler } = await import("./dashboard/stats.ts");
    return statsHandler(req, context);
  }
  
  if (path.startsWith("/api/dashboard/activity")) {
    const { default: activityHandler } = await import("./dashboard/activity.ts");
    return activityHandler(req, context);
  }
  
  if (path.startsWith("/api/rooms")) {
    const { default: roomsHandler } = await import("./rooms/index.ts");
    return roomsHandler(req, context);
  }
  
  if (path.startsWith("/api/requests")) {
    const { default: requestsHandler } = await import("./requests/index.ts");
    return requestsHandler(req, context);
  }
  
  if (path.startsWith("/api/staff")) {
    const { default: staffHandler } = await import("./staff/index.ts");
    return staffHandler(req, context);
  }
  
  if (path.startsWith("/api/inventory")) {
    const { default: inventoryHandler } = await import("./inventory/index.ts");
    return inventoryHandler(req, context);
  }
  
  if (path.startsWith("/api/departments")) {
    const { default: departmentsHandler } = await import("./departments/index.ts");
    return departmentsHandler(req, context);
  }
  
  // Default response for unmatched routes
  return new Response(JSON.stringify({ error: "Route not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/*",
  method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};