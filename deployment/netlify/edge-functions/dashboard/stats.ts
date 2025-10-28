import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Mock dashboard stats
  const stats = {
    pendingRequests: 12,
    occupiedRooms: 65,
    availableRooms: 35,
    revenueToday: 12500,
    occupancyRate: 65,
    staffActive: 24,
    maintenanceRequests: 8,
    avgResponseTime: 32,
    guestSatisfaction: 94
  };

  return new Response(JSON.stringify({ stats }), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    },
  });
};

export const config = {
  path: "/api/dashboard/stats",
  method: ["GET"],
};