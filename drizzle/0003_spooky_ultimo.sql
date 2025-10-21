CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" text,
	"key" text NOT NULL,
	"revoked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"last_used_at" timestamp
);
