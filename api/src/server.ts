import express from 'express';

const app = express();
const PORT = process.env['PORT'] || 3001;

// Basic route for testing
app.get('/', (_req, res) => {
  res.json({ message: 'Patient Management API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
}); 