import { defineConfig } from 'drizzle-kit';
import env from './src/libs/env';

export default defineConfig({
  schema: './src/db/schemas.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
});
