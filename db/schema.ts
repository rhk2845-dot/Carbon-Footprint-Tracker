import { pgTable, serial, real, integer, timestamp } from "drizzle-orm/pg-core";

export const footprint = pgTable("footprint", {
  id: serial().primaryKey(),
  carKm: real("car_km").notNull(),
  busKm: real("bus_km").notNull(),
  electricityUnits: real("electricity_units").notNull(),
  carbon: real().notNull(),
  ecoScore: integer("eco_score").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
