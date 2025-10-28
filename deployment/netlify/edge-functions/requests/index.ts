import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET" && req.method !== "PUT") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "GET") {
    // Mock requests data
    const requests = [
      {
        id: 1,
        guestId: 1,
        roomId: 1,
        departmentId: 1,
        title: 'Extra Towels',
        description: 'Guest needs extra towels in room 101',
        priorityId: 2,
        statusId: 1,
        assignedToId: 5,
        createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        updatedAt: new Date().toISOString(),
        guestName: 'John Doe',
        roomNumber: '101',
        department: 'HOUSEKEEPING',
        status: 'PENDING',
        priority: 'MEDIUM',
        assignedTo: 'Housekeeping Staff'
      },
      {
        id: 2,
        guestId: 2,
        roomId: 2,
        departmentId: 2,
        title: 'Leaky Faucet',
        description: 'Bathroom sink faucet is leaking in room 102',
        priorityId: 3,
        statusId: 2,
        assignedToId: 8,
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        updatedAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        guestName: 'Jane Smith',
        roomNumber: '102',
        department: 'MAINTENANCE',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assignedTo: 'Maintenance Team'
      },
      {
        id: 3,
        guestId: 3,
        roomId: 3,
        departmentId: 3,
        title: 'Room Service',
        description: 'Guest requests dinner to room 103',
        priorityId: 1,
        statusId: 3,
        assignedToId: 12,
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        updatedAt: new Date().toISOString(),
        guestName: 'Robert Johnson',
        roomNumber: '103',
        department: 'FOOD_AND_BEVERAGE',
        status: 'COMPLETED',
        priority: 'LOW',
        assignedTo: 'Restaurant Staff'
      }
    ];

    return new Response(JSON.stringify({ requests }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
    });
  }

  if (req.method === "PUT") {
    try {
      const url = new URL(req.url);
      const requestId = url.pathname.split("/")[3]; // /api/requests/{id}/status
      const { status } = await req.json();
      
      // Mock request update
      const updatedRequest = {
        id: parseInt(requestId || "0"),
        status: status,
        updatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify({
        success: true,
        request: updatedRequest
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};

export const config = {
  path: ["/api/requests", "/api/requests/*/status"],
  method: ["GET", "PUT"],
};