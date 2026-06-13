import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { footprint } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export default async (req: Request) => {
  const records = await db
    .select({
      id: footprint.id,
      carbon: footprint.carbon,
      ecoScore: footprint.ecoScore,
      createdAt: footprint.createdAt,
    })
    .from(footprint)
    .orderBy(desc(footprint.createdAt))
    .limit(10);

  return Response.json(records);
};

export const config: Config = {
  path: "/api/history",
  method: "GET",
};
