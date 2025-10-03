import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET" && req.method !== "PUT") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "GET") {
    // Mock inventory data
    const inventory = [
      { id: 1, name: 'Towels', quantity: 100, minStock: 50 },
      { id: 2, name: 'Soap', quantity: 200, minStock: 75 },
      { id: 3, name: 'Shampoo', quantity: 150, minStock: 60 },
      { id: 4, name: 'Conditioner', quantity: 120, minStock: 50 },
      { id: 5, name: 'Toothbrushes', quantity: 80, minStock: 40 },
      { id: 6, name: 'Toothpaste', quantity: 90, minStock: 45 },
      { id: 7, name: 'Bed Sheets', quantity: 60, minStock: 30 },
      { id: 8, name: 'Pillows', quantity: 45, minStock: 25 }
    ];

    return new Response(JSON.stringify({ inventory }), {
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
      const inventoryId = url.pathname.split("/")[3]; // /api/inventory/{id}/quantity
      const { quantity } = await req.json();
      
      // Mock inventory update
      const updatedInventory = {
        id: parseInt(inventoryId || "0"),
        quantity: quantity,
        updatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify({
        success: true,
        inventory: updatedInventory
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
  path: ["/api/inventory", "/api/inventory/*/quantity"],
  method: ["GET", "PUT"],
};