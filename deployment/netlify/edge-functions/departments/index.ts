import type { Context } from "https://edge.netlify.com/";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Mock departments data
  const departments = [
    { id: 1, name: 'HOUSEKEEPING', description: 'Housekeeping Department' },
    { id: 2, name: 'MAINTENANCE', description: 'Maintenance Department' },
    { id: 3, name: 'FOOD_AND_BEVERAGE', description: 'Food and Beverage Department' },
    { id: 4, name: 'FRONT_OFFICE', description: 'Front Office Department' },
    { id: 5, name: 'SECURITY', description: 'Security Department' },
    { id: 6, name: 'HUMAN_RESOURCES', description: 'Human Resources Department' }
  ];

  return new Response(JSON.stringify({ departments }), {
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
  path: "/api/departments",
  method: ["GET"],
};