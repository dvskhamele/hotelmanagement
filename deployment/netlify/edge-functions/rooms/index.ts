import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET" && req.method !== "PUT") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "GET") {
    // Mock rooms data
    const rooms = [
      { id: 1, number: '101', type: 'Standard', status: 'CLEAN' },
      { id: 2, number: '102', type: 'Standard', status: 'DIRTY' },
      { id: 3, number: '103', type: 'Deluxe', status: 'INSPECTED' },
      { id: 4, number: '104', type: 'Suite', status: 'OUT_OF_ORDER' },
      { id: 5, number: '201', type: 'Standard', status: 'CLEAN' },
      { id: 6, number: '202', type: 'Standard', status: 'DIRTY' },
      { id: 7, number: '203', type: 'Deluxe', status: 'CLEAN' },
      { id: 8, number: '204', type: 'Suite', status: 'DIRTY' }
    ];

    return new Response(JSON.stringify({ rooms }), {
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
      const roomId = url.pathname.split("/").pop();
      const { status } = await req.json();
      
      // Mock room update
      const updatedRoom = {
        id: parseInt(roomId || "0"),
        status: status,
        updatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify({
        success: true,
        room: updatedRoom
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
  path: ["/api/rooms", "/api/rooms/*"],
  method: ["GET", "PUT"],
};