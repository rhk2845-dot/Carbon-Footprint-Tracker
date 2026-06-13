CREATE TABLE "footprint" (
	"id" serial PRIMARY KEY,
	"car_km" real NOT NULL,
	"bus_km" real NOT NULL,
	"electricity_units" real NOT NULL,
	"carbon" real NOT NULL,
	"eco_score" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
