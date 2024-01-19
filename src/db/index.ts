import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "./schema";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_CONNECTION_STRING!, {
  database: process.env.DATABASE_DB
});

export const db = drizzle(client, { schema });