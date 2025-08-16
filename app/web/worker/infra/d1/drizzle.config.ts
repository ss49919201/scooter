import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./worker/infra/d1/schema.ts",
  out: "./worker/infra/d1/migrations",
  dialect: "sqlite",
  driver: "d1-http",
});
