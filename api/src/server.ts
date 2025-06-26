import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { upload } from './middleware/upload';
import { validateRequest } from './middleware/validation';
import { PatientSchema } from './schemas/patient';
import { testConnection } from '@/db';
import env from '@/libs/env';

const app = express();
const PORT = env.PORT;

// --- Middleware Chain ---
app.use(helmet()); // Security headers
app.use(cors({ origin: env.CORS_ORIGIN })); // Enable CORS with specific origin
app.use(morgan('tiny')); // Logging
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Create API router
const apiRouter = express.Router();

// Basic route for testing
apiRouter.get('/', (_req, res) => {
  res.json({ message: 'Patient Management API is running with middleware!' });
});

// Health check endpoint
apiRouter.get('/healthcheck', async (_req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected',
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

// Test validation route
apiRouter.post('/patients', validateRequest(PatientSchema), (req, res): void => {
  res.json({
    message: 'Patient data validation passed!',
    data: req.body,
  });
});

// Mount API router at /api
app.use('/api', apiRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at ${env.API_BASE_URL}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);

  // Test database connection
  const dbConnected = await testConnection();
  console.log(`🗄️  Database: ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`);
});
