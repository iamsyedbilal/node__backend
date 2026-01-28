import express from 'express';
// HTTP request logger middleware
import morgan from 'morgan';
import userRoutes from './routes/user.route.js';
import tourRoutes from './routes/tour.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './utils/appError.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically switch based on your environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Parse query strings
app.set('query parser', 'extended');
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Mounting the routers
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRoutes);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
