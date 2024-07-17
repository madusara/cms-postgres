import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "products_images" DROP CONSTRAINT "products_images_media_id_media_id_fk";

ALTER TABLE "products_images" ADD COLUMN "url" varchar;
ALTER TABLE "products_images" DROP COLUMN IF EXISTS "media_id";`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "products_images" ADD COLUMN "media_id" integer;
DO $$ BEGIN
 ALTER TABLE "products_images" ADD CONSTRAINT "products_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "products_images" DROP COLUMN IF EXISTS "url";`)
};
