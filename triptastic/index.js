import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/connection.js';

/* -------------------- Load Environment Variables -------------------- */
dotenv.config({ path: './.env' });

/* -------------------- Handle Uncaught Exceptions -------------------- */

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 4000;

let server;

/* -------------------- Connect DB & Start Server -------------------- */

connectDB()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`Triptastic server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error:', err);
    process.exit(1);
  });

/* -------------------- Handle Unhandled Promise Rejections -------------------- */

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION 💥 Shutting down...');
  console.error(err.name, err.message);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
