import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { upload } from './middleware/upload';

const app = express();
const PORT = process.env['PORT'] || 3001;

// --- Middleware Chain ---
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
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
apiRouter.get('/healthcheck', (_req, res) => {
  res.json({ status: 'ok' });
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

// Mount API router at /api
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
}); 