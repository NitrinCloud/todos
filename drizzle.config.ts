import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_STRING!,
  },
  verbose: true,
  strict: true,
} satisfies Config;