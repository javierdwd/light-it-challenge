import { drizzle } from 'drizzle-orm/node-postgres';
import env from '@/libs/env';

// Create Drizzle database instance with direct configuration
export const db = drizzle({
  connection: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
});
