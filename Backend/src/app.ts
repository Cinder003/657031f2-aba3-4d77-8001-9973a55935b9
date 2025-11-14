import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes';
import { logger } from './utils/logger';

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
};
app.use(cors(corsOptions));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/todos', todoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Todo API is running!');
});

// Global error handler (simple version)
app.use((err: Error, req: Request, res: Response) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;