import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Mock dashboard activity
  const activity = [
    {
      id: 1,
      type: 'request',
      title: 'New request created',
      description: 'John Doe - Extra Towels (Room 101)',
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    },
    {
      id: 2,
      type: 'room',
      title: 'Room status updated',
      description: 'Room 102 marked as DIRTY',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: 'DIRTY'
    },
    {
      id: 3,
      type: 'request',
      title: 'Request completed',
      description: 'Jane Smith - Leaky Faucet (Room 102)',
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      status: 'COMPLETED'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Maintenance scheduled',
      description: 'HVAC inspection for Floor 2',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      status: 'SCHEDULED'
    }
  ];

  return new Response(JSON.stringify({ activity }), {
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
  path: "/api/dashboard/activity",
  method: ["GET"],
};