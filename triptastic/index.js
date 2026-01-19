import dotenv from 'dotenv';

import app from './app.js';
import connectDB from './db/connection.js';
dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 4000;

// Connect to the database first
connectDB()
  .then(() => {
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Triptastic server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server due to DB connection error:', error);
    process.exit(1);
  });
