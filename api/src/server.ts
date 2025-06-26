import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env['PORT'] || 3001;

// --- Middleware Chain ---
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('tiny')); // Logging
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic route for testing
app.get('/', (_req, res) => {
  res.json({ message: 'Patient Management API is running with middleware!' });
});

// Test route to verify middleware
app.post('/test', (req, res) => {
  res.json({ received: req.body });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
}); 