import dotenv from 'dotenv';
import { EnvironmentVariables } from '@/types/env';

// Load environment variables from .env file
dotenv.config();

// Environment configuration with defaults
export const env: EnvironmentVariables = {
  // Server Configuration
  NODE_ENV: (process.env['NODE_ENV'] as EnvironmentVariables['NODE_ENV']) || 'development',
  PORT: process.env['PORT'] || '3001',

  // Database Configuration
  DB_HOST: process.env['DB_HOST'] || 'localhost',
  DB_PORT: process.env['DB_PORT'] || '5432',
  DB_NAME: process.env['DB_NAME'] || '',
  DB_USER: process.env['DB_USER'] || '',
  DB_PASSWORD: process.env['DB_PASSWORD'] || '',

  // File Upload Configuration
  UPLOAD_DIR: process.env['UPLOAD_DIR'] || './uploads',
  MAX_FILE_SIZE: process.env['MAX_FILE_SIZE'] || '5242880',

  // API Configuration
  API_BASE_URL: process.env['API_BASE_URL'] || 'http://localhost:3001/api',
  CORS_ORIGIN: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
};

// Validate required environment variables
const requiredEnvVars: (keyof EnvironmentVariables)[] = [
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
];

for (const envVar of requiredEnvVars) {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default env;
