CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY,
	"email" varchar NOT NULL UNIQUE,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"created_at" timestamp(0) DEFAULT now() NOT NULL,
	"updated_at" timestamp(0) DEFAULT now() NOT NULL,
	"deleted_at" timestamp(0)
);
--> statement-breakpoint
CREATE TABLE "user_details" (
	"id" bigserial PRIMARY KEY,
	"user_id" bigint NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"created_at" timestamp(0) DEFAULT now() NOT NULL,
	"updated_at" timestamp(0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auths" (
	"id" bigserial PRIMARY KEY,
	"user_id" bigint NOT NULL,
	"token" text NOT NULL,
	"revoke" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(0) DEFAULT now() NOT NULL,
	"updated_at" timestamp(0) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "auths" ADD CONSTRAINT "auths_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");