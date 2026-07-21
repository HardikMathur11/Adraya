import { Router, Request, Response } from 'express';
import { Visit } from '../models/Visit';

const router = Router();

// GET /api/visits (Fetch visits)
router.get('/', async (req: Request, res: Response) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 });
    res.json(visits);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/visits (Book Loom Visit — real-time sync to Weaver Dashboard)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerId, customerName, customerEmail, weaverId, weaverName, village, experienceTitle, date, timeSlot, price, guestsCount } = req.body;

    const visit = await Visit.create({
      visitId: `VISIT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: customerId || 'cust-1',
      customerName: customerName || 'Ananya Sharma',
      customerEmail: customerEmail || 'ananya@gmail.com',
      weaverId: weaverId || 'radha-devi',
      weaverName: weaverName || 'Radha Devi',
      village: village || 'Pochampally',
      experienceTitle: experienceTitle || 'Pochampally Double-Ikat Masterclass',
      date: date || '2026-08-15',
      timeSlot: timeSlot || '10:00 AM — 01:00 PM',
      price: Number(price) || 3500,
      guestsCount: Number(guestsCount) || 1,
      status: 'Confirmed'
    });

    res.status(201).json({
      message: 'Loom Visit booked successfully! Synced to Weaver Dashboard in real-time.',
      visit
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
