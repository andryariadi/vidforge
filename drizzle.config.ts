import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:Vm3b9OgoPBSI@ep-twilight-paper-a5ckz8cl.us-east-2.aws.neon.tech/vidforge-db?sslmode=require",
  },
  //   verbose: true,
  //   strict: true,
  //   entities: {
  //     roles: true,
  //   },
});
