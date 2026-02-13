import express from 'express';
import morgan from 'morgan'; // HTTP request logger for development
import userRoutes from './routes/user.route.js';
import tourRoutes from './routes/tour.route.js';
import reviewRoutes from './routes/review.route.js';
import path from 'path';
import rateLimit from 'express-rate-limit'; // To limit repeated requests
import { fileURLToPath } from 'url';
import AppError from './utils/appError.js'; // Custom error class
import helmet from 'helmet'; // Security HTTP headers
import hpp from 'hpp';

const app = express();

// ---- Fix __dirname in ES Modules ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------
// 1) GLOBAL MIDDLEWARES
// -------------------------

// ---- Set security HTTP headers ----
// Protects against well-known web vulnerabilities by setting headers like:
// Content-Security-Policy, X-Frame-Options, X-XSS-Protection, HSTS, etc.
app.use(helmet());

// ---- Rate limiting ----
// Limit repeated requests from the same IP to prevent brute-force attacks
const limiter = rateLimit({
  max: 100, // Max 100 requests
  windowMs: 60 * 60 * 1000, // per 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter); // Apply only to API routes

// ---- HTTP request logger (development only) ----
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ---- Body parser ----
// Parses incoming JSON requests and limits payload to 10kb
app.use(express.json({ limit: '10kb' }));

// ---- Parse URL-encoded form data (e.g., from HTML forms) ----
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ---- Serve static files ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- Extended query string parsing ----
app.set('query parser', 'extended');

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingQuantity',
      'avgRating',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// -------------------------
// 2) ROUTES
// -------------------------

// Mount routers for user and tour APIs
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// -------------------------
// 3) UNHANDLED ROUTES
// -------------------------

// Catch all routes that were not matched by above routers
// Forward them to global error handler
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// -------------------------
// 4) EXPORT APP
// -------------------------
export default app;
