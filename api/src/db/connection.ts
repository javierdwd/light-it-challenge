import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import env from '@/libs/env';

// Create postgres pool
const pool = new Pool({
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

// Create Drizzle database instance

export const db = drizzle(pool);
