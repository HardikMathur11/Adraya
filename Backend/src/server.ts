import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import visitRoutes from './routes/visits';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
let PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hardikmathur11:Mongowithhardik@cluster0.0stebd8.mongodb.net/adraya_luxury_heritage?retryWrites=true&w=majority';

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database Helper for Serverless & Express
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
}

app.use(async (req: Request, res: Response, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'Healthy',
    brand: 'Adraya Luxury Heritage',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting',
    timestamp: new Date().toISOString()
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectDB().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Adraya Backend Server running on http://localhost:${PORT}`);
    });
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        startServer(PORT + 1);
      }
    });
  });

  function startServer(portToUse: number) {
    const server = app.listen(portToUse, () => {
      console.log(`🚀 Adraya Backend Server running on http://localhost:${portToUse}`);
    });
  }
}

export default app;
