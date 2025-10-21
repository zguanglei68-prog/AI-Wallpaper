-- Safe migration: only create our new tables; do not touch existing users table or add FKs

CREATE TABLE IF NOT EXISTS "credits" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "left_credits" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "generations" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer,
  "prompt" text,
  "style" text,
  "width" integer,
  "height" integer,
  "result_url" text,
  "success" boolean DEFAULT true,
  "created_at" timestamp DEFAULT now()
);