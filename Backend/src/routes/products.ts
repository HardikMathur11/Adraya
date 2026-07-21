import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';

const router = Router();

// GET /api/products (Fetch all products for all users)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { mood } = req.query;
    const query = mood && mood !== 'all' ? { mood } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products (Upload new weaver listing — instantly available to all users)
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      weaveName,
      region,
      weaverId,
      weaverName,
      weaverVillage,
      price,
      mood,
      material,
      hoursInvested,
      culturalMeaning,
      textureUrl,
      images,
      dimensions,
      yarnSpec
    } = req.body;

    const slug = (title || 'pochampally-ikat-silk-saree').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const product = await Product.create({
      slug,
      title: title || 'Pochampally Double-Ikat Silk Saree',
      weaveName: weaveName || 'Double-Ikat Silk Weave',
      region: region || 'Pochampally, Telangana',
      weaverId: weaverId || 'radha-devi',
      weaverName: weaverName || 'Radha Devi',
      weaverVillage: weaverVillage || 'Pochampally',
      price: Number(price) || 18500,
      weaverSharePercentage: 82,
      stock: 3,
      mood: mood || 'royal',
      material: material || 'Pure Mulberry Silk',
      hoursInvested: Number(hoursInvested) || 140,
      giCertified: true,
      description: culturalMeaning || 'Authentic handloom drape woven on traditional pit looms.',
      culturalMeaning: culturalMeaning || 'Symbol of grace and royal protection.',
      textureUrl: textureUrl || '/assets/article-a/1.jpg',
      macroTextureUrl: '/assets/article-a/2.jpg',
      images: images && images.length > 0 ? images : ['/assets/article-a/1.jpg', '/assets/article-a/2.jpg'],
      dimensions: dimensions || '5.50m Saree + 0.80m Blouse',
      yarnSpec: yarnSpec || '300D Mulberry Silk',
      qrId: `PASSPORT-${Date.now()}`
    });

    res.status(201).json({
      message: 'New Masterpiece Listing published! Visible to all users in real-time.',
      product
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
