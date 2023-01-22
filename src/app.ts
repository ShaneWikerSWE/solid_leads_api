import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { authRoutes, budgetRoutes, marketRoutes, paymentRoutes, dashboardRoutes, webhookRoutes } from './api/v1/routes';
import connection from './config/databaseConfig';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);
app.use('/market', marketRoutes);
app.use('/payment', paymentRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/webhook', webhookRoutes);

// not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('page not found');
  next();
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Request failed ${req.originalUrl}`);
  console.error(err);
  res.status(500).json({ msg: err.message });
});

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started on port ${process.env.PORT || 8000}`);
    });
  } catch (err) {
    console.error(err);
  }
};

void start();
