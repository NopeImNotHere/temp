import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL ?? 'ERR';

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);