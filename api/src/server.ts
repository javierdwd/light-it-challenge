import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { upload } from './middleware/upload';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { testConnection } from '@/db';
import { runMigrations } from '@/db/connection';
import patientsRouter from './routes/patients';
import env from '@/libs/env';

const app = express();
const PORT = env.PORT;

// --- Middleware Chain ---
app.use(helmet()); // Security headers
app.use(cors({ origin: env.CORS_ORIGIN })); // Enable CORS with specific origin
app.use(morgan('tiny')); // Logging
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Create API router
const apiRouter = express.Router();

// Basic route for testing
apiRouter.get('/', (_req, res) => {
  res.json({ message: 'Patient Management API is running with middleware!' });
});

// Health check endpoint
apiRouter.get('/healthcheck', async (_req, res) => {
  res.json({
    status: 'ok',
  });
});

// File upload route
apiRouter.post('/upload', upload.single('image'), (req, res): void => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded or invalid file type.' });
    return;
  }
  res.json({
    message: 'File uploaded successfully!',
    file: {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
    },
  });
});

// Mount patients routes
apiRouter.use('/patients', patientsRouter);

// Mount API router at /api
app.use('/api', apiRouter);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at ${env.API_BASE_URL}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);

  // Test database connection
  const dbConnected = await testConnection();
  console.log(`🗄️  Database: ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`);

  // Run database migrations
  if (dbConnected) {
    try {
      await runMigrations();
    } catch (error) {
      console.error('❌ Failed to run migrations on startup:', error);
      process.exit(1);
    }
  }
});
