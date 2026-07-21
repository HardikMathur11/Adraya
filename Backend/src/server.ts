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

function startServer(portToUse: number) {
  const server = app.listen(portToUse, () => {
    console.log(`🚀 Adraya Backend Server running on http://localhost:${portToUse}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToUse} is already in use. Retrying on port ${portToUse + 1}...`);
      startServer(portToUse + 1);
    } else {
      console.error('❌ Server error:', err);
    }
  });
}

// Connect Database & Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    startServer(PORT);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });
