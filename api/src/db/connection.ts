import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
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

// Migration function
export const runMigrations = async (): Promise<void> => {
  try {
    console.log('🔄 Running database migrations...');
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('✅ Database migrations completed successfully');
  } catch (error) {
    console.error('❌ Error running migrations:', error);
    throw error;
  }
};
