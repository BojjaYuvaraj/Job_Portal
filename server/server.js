import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import './config/instrument.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import * as Sentry from "@sentry/node";
import connectCloudinary from './config/cloudinary.js';
import { clerkMiddleware } from '@clerk/express';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Connect to database
const startServer = async () => {
  await connectDB();
  await connectCloudinary();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(clerkMiddleware());

  // Routes
  app.get('/', (req, res) => res.send("API Working"));

  app.get("/debug-sentry", function(req, res) {
    throw new Error("My first Sentry error");
  });
  
  app.post('/webhooks', clerkWebhooks);
  app.use('/api/company', companyRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api/users', userRoutes);

  const PORT = process.env.PORT || 3072;
  Sentry.setupExpressErrorHandler(app);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();