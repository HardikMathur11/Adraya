import { Router, Request, Response } from 'express';
import { queryGrokAi } from '../services/grokAi';

const router = Router();

// POST /api/ai/chat (Grok AI Chatbot)
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, roleContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message prompt is required.' });
    }

    const reply = await queryGrokAi(message, roleContext || 'customer');
    res.json({ reply });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/auto-fill (AI Form Auto-Fill Service)
router.post('/auto-fill', async (req: Request, res: Response) => {
  try {
    const prompt = 'Generate comprehensive details for a Pochampally double-Ikat Mulberry silk saree handwoven in Telangana.';
    const reply = await queryGrokAi(prompt, 'weaver');
    
    res.json({
      title: 'Pochampally Double-Ikat Silk Saree — Peacock Motif',
      craftType: 'Double-Ikat Resist Dye Silk',
      price: 18500,
      hoursInvested: 140,
      culturalMeaning: 'The double-peacock motif represents grace, fidelity, and royal protection across Telangana heritage households.',
      dimensions: '5.50 Meters Saree + 0.80m Blouse',
      yarnSpec: '300D Mulberry Silk & Botanical Dyes',
      aiSummary: reply
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
