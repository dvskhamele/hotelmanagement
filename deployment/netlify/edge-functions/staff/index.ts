import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET" && req.method !== "PUT") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "GET") {
    // Mock staff data
    const staff = [
      { id: 1, name: 'John Smith', role: 'Manager', status: 'ACTIVE' },
      { id: 2, name: 'Jane Doe', role: 'Housekeeping', status: 'ACTIVE' },
      { id: 3, name: 'Robert Johnson', role: 'Maintenance', status: 'ON_BREAK' },
      { id: 4, name: 'Emily Wilson', role: 'Front Desk', status: 'ACTIVE' },
      { id: 5, name: 'Michael Brown', role: 'Housekeeping', status: 'OFFLINE' },
      { id: 6, name: 'Sarah Davis', role: 'Maintenance', status: 'ACTIVE' },
      { id: 7, name: 'David Miller', role: 'Food Service', status: 'ACTIVE' },
      { id: 8, name: 'Lisa Anderson', role: 'Security', status: 'ACTIVE' }
    ];

    return new Response(JSON.stringify({ staff }), {
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
      const staffId = url.pathname.split("/")[3]; // /api/staff/{id}/status
      const { status } = await req.json();
      
      // Mock staff update
      const updatedStaff = {
        id: parseInt(staffId || "0"),
        status: status,
        updatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify({
        success: true,
        staff: updatedStaff
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
  path: ["/api/staff", "/api/staff/*/status"],
  method: ["GET", "PUT"],
};