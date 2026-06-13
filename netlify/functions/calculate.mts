import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { footprint } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { car, bus, electricity } = await req.json();

  if (car == null || bus == null || electricity == null) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const carKm = parseFloat(car);
  const busKm = parseFloat(bus);
  const electricityUnits = parseFloat(electricity);

  const carbon = Math.round((carKm * 0.192 + busKm * 0.105 + electricityUnits * 0.82) * 100) / 100;
  const ecoScore = Math.max(0, Math.round(100 - carbon * 1.5));

  let suggestion: string;
  let level: string;
  if (carbon > 20) {
    suggestion = "Use public transport more often to reduce your carbon footprint.";
    level = "high";
  } else if (carbon > 10) {
    suggestion = "Try reducing electricity consumption and consider cycling for short trips.";
    level = "moderate";
  } else {
    suggestion = "Great! Your carbon footprint is relatively low. Keep it up!";
    level = "low";
  }

  await db.insert(footprint).values({ carKm, busKm, electricityUnits, carbon, ecoScore });

  return Response.json({ carbon, ecoScore, suggestion, level });
};

export const config: Config = {
  path: "/api/calculate",
  method: "POST",
};
