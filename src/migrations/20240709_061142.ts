import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_products_status" AS ENUM('active', 'draft');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_products_content_blocks_type" AS ENUM('list', 'Paragraph');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "brps_brps" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"brp_name" varchar,
	"capacity" varchar
);

CREATE TABLE IF NOT EXISTS "brps" (
	"id" serial PRIMARY KEY NOT NULL,
	"area" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "guides" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"pdf_url" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "makers_products" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"product" varchar
);

CREATE TABLE IF NOT EXISTS "makers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"logo_url" varchar NOT NULL,
	"fcr_d" boolean,
	"ffr" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "products_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"url" varchar
);

CREATE TABLE IF NOT EXISTS "products_content_blocks" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"type" "enum_products_content_blocks_type",
	"content" jsonb,
	"content_html" varchar
);

CREATE TABLE IF NOT EXISTS "products_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);

CREATE TABLE IF NOT EXISTS "products_options" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"values" varchar
);

CREATE TABLE IF NOT EXISTS "products_tags" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tag" varchar
);

CREATE TABLE IF NOT EXISTS "products_variants" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"variant" varchar
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"short_description" varchar NOT NULL,
	"price" numeric NOT NULL,
	"currency" varchar NOT NULL,
	"status" "enum_products_status" NOT NULL,
	"inventory_quantity" varchar NOT NULL,
	"sku" varchar,
	"weight" varchar,
	"weight_unit" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "brps_brps_order_idx" ON "brps_brps" ("_order");
CREATE INDEX IF NOT EXISTS "brps_brps_parent_id_idx" ON "brps_brps" ("_parent_id");
CREATE INDEX IF NOT EXISTS "brps_created_at_idx" ON "brps" ("created_at");
CREATE INDEX IF NOT EXISTS "guides_created_at_idx" ON "guides" ("created_at");
CREATE INDEX IF NOT EXISTS "makers_products_order_idx" ON "makers_products" ("_order");
CREATE INDEX IF NOT EXISTS "makers_products_parent_id_idx" ON "makers_products" ("_parent_id");
CREATE INDEX IF NOT EXISTS "makers_created_at_idx" ON "makers" ("created_at");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "products_images_order_idx" ON "products_images" ("_order");
CREATE INDEX IF NOT EXISTS "products_images_parent_id_idx" ON "products_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_content_blocks_order_idx" ON "products_content_blocks" ("_order");
CREATE INDEX IF NOT EXISTS "products_content_blocks_parent_id_idx" ON "products_content_blocks" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_categories_order_idx" ON "products_categories" ("_order");
CREATE INDEX IF NOT EXISTS "products_categories_parent_id_idx" ON "products_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_options_order_idx" ON "products_options" ("_order");
CREATE INDEX IF NOT EXISTS "products_options_parent_id_idx" ON "products_options" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_tags_order_idx" ON "products_tags" ("_order");
CREATE INDEX IF NOT EXISTS "products_tags_parent_id_idx" ON "products_tags" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_variants_order_idx" ON "products_variants" ("_order");
CREATE INDEX IF NOT EXISTS "products_variants_parent_id_idx" ON "products_variants" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "brps_brps" ADD CONSTRAINT "brps_brps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "brps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "makers_products" ADD CONSTRAINT "makers_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "makers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_content_blocks" ADD CONSTRAINT "products_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_options" ADD CONSTRAINT "products_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "brps_brps";
DROP TABLE "brps";
DROP TABLE "guides";
DROP TABLE "makers_products";
DROP TABLE "makers";
DROP TABLE "users";
DROP TABLE "products_images";
DROP TABLE "products_content_blocks";
DROP TABLE "products_categories";
DROP TABLE "products_options";
DROP TABLE "products_tags";
DROP TABLE "products_variants";
DROP TABLE "products";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`)
};
