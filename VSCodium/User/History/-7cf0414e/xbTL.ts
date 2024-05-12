import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString);
