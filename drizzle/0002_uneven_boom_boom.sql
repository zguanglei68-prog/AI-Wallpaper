CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text NOT NULL,
	"slug" text NOT NULL,
	"locale" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "posts_uuid_unique" UNIQUE("uuid")
);
