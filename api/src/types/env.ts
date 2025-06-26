export interface EnvironmentVariables {
  // Server Configuration
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  // Database Configuration
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_URL: string;

  // File Upload Configuration
  UPLOAD_DIR: string;
  MAX_FILE_SIZE: string;

  // API Configuration
  API_BASE_URL: string;
  CORS_ORIGIN: string;
}
