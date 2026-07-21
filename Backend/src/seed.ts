import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Product } from './models/Product';
import { Visit } from './models/Visit';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hardikmathur11:Mongowithhardik@cluster0.0stebd8.mongodb.net/adraya_luxury_heritage?retryWrites=true&w=majority';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected successfully!');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Visit.deleteMany({});

    console.log('Seeding 12 Users (6 Master Weavers + 6 Connoisseur Customers)...');
    const defaultPassword = await bcrypt.hash('AdrayaPass123', 10);

    const dummyUsers = [
      // 6 Master Weavers
      {
        name: 'Radha Devi',
        email: 'radha@adraya.in',
        passwordHash: defaultPassword,
        role: 'weaver',
        village: 'Pochampally',
        region: 'Telangana',
        specialty: 'Double-Ikat Silk Resist Dyeing',
        yearsWeaving: 18,
        biography: 'Radha Devi leads a women-led cluster of 44 weavers in Pochampally.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        awards: ['National Handloom Merit Award 2021', 'Telangana State Craft Master Honor']
      },
      {
        name: 'Lakshmi Amma',
        email: 'lakshmi@adraya.in',
        passwordHash: defaultPassword,
        role: 'weaver',
        village: 'Kanchipuram',
        region: 'Tamil Nadu',
        specialty: 'Korvai Heavy Temple Border Silks',
        yearsWeaving: 29,
        biography: 'A pioneer of eco-dyed Kanchipuram mulberry silks leading temple city artisans.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
        awards: ['UNESCO Craft Excellence Seal', 'Sant Kabir Awardee']
      },
      {
        name: 'Bipul Das',
        email: 'bipul@adraya.in',
        passwordHash: defaultPassword,
        role: 'weaver',
        village: 'Sualkuchi',
        region: 'Assam',
        specialty: 'Muga & Eri Silk Jacquard',
        yearsWeaving: 22,
        biography: '4th generation master weaver from Sualkuchi specializing in wild golden Muga silk.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
        awards: ['Assam Silk Legend Honor', 'GI Assam Weaver Pioneer']
      },
      {
        name: 'Ghulam Nabi',
        email: 'ghulam@adraya.in',
        passwordHash: defaultPassword,
        role: 'weaver',
        village: 'Srinagar',
        region: 'Kashmir',
        specialty: 'Kani Needle Weave Pashmina',
        yearsWeaving: 35,
        biography: 'Master craftsman preserving 16th-century Persian Kani needle weaving techniques.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        awards: ['Shilp Guru Award 2018', 'State Artisan Gold Medalist']
      },
      {
        name: 'Gurudev Varma',
        email: 'gurudev@adraya.in',
        passwordHash: defaultPassword,
        role: 'weaver',
        village: 'Varanasi Old Quarter',
        region: 'Uttar Pradesh',
        specialty: 'Real Zari Kadwa Brocade',
        yearsWeaving: 45,
        biography: 'Shilp Guru master weaver operating hand-pulled pit looms in Varanasi Old Quarter.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        awards: ['Shilp Guru 2018', 'National Award for Master Weavers']
      },
      {
        name: 'Savita Kshirsagar',
        email: 'savita@adraya.in',
        passwordHash: defaultPassword,
        role: 'weaver',
        village: 'Yeola',
        region: 'Maharashtra',
        specialty: 'Yeola Paithani Peacock Tapestry',
        yearsWeaving: 24,
        biography: 'Master Paithani weaver specializing in gold zari peacock pallus in Yeola.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        awards: ['Maharashtra State Shilpkar Honor', 'Handloom Heritage Seal']
      },

      // 6 Connoisseur Customers
      {
        name: 'Ananya Sharma',
        email: 'ananya@gmail.com',
        passwordHash: defaultPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Priya Mehta',
        email: 'priya@boutiquesilk.com',
        passwordHash: defaultPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Rajesh Kapoor',
        email: 'rajesh@mumbaiart.in',
        passwordHash: defaultPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Sophia Laurent',
        email: 'sophia@maisonsilk.fr',
        passwordHash: defaultPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Aarav Patel',
        email: 'aarav@delhibridal.com',
        passwordHash: defaultPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Vikramaditya Singh',
        email: 'vikram@heritagecourt.in',
        passwordHash: defaultPassword,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
      }
    ];

    const insertedUsers = await User.insertMany(dummyUsers);
    console.log(`Successfully seeded ${insertedUsers.length} Users into MongoDB!`);

    console.log('Seeding Handloom Masterpiece Products...');
    const dummyProducts = [
      {
        slug: 'pochampally-ikat-silk-saree',
        title: 'Pochampally Double-Ikat Silk Saree — Peacock Motif',
        weaveName: 'Double-Ikat Resist Dye Silk',
        region: 'Pochampally, Telangana',
        weaverId: insertedUsers[0]._id.toString(),
        weaverName: 'Radha Devi',
        weaverVillage: 'Pochampally',
        weaverAvatar: insertedUsers[0].avatar,
        price: 18500,
        weaverSharePercentage: 82,
        stock: 3,
        mood: 'royal',
        material: 'Pure Mulberry Silk & Botanical Organic Dyes',
        hoursInvested: 140,
        giCertified: true,
        description: 'Authentic Pochampally double-Ikat handloom drape.',
        culturalMeaning: 'The double-peacock motif represents grace, fidelity, and royal protection.',
        textureUrl: '/assets/article-a/1.jpg',
        macroTextureUrl: '/assets/article-a/2.jpg',
        images: ['/assets/article-a/1.jpg', '/assets/article-a/2.jpg', '/assets/article-a/3.jpg', '/assets/article-a/4.jpg'],
        qrId: 'PASSPORT-PC-2026-8841'
      },
      {
        slug: 'kanjeevaram-temple-border-saree',
        title: 'Kanjeevaram Korvai Temple Border Silk Saree — Crimson Gold',
        weaveName: 'Korvai Interlocked Border Mulberry Silk',
        region: 'Kanchipuram, Tamil Nadu',
        weaverId: insertedUsers[1]._id.toString(),
        weaverName: 'Lakshmi Amma',
        weaverVillage: 'Kanchipuram',
        weaverAvatar: insertedUsers[1].avatar,
        price: 32000,
        weaverSharePercentage: 84,
        stock: 2,
        mood: 'wedding',
        material: 'Heavyweight Mulberry Silk & Pure Silver Zari',
        hoursInvested: 210,
        giCertified: true,
        description: 'Woven with three single threads of silk twisted together with silver zari wire.',
        culturalMeaning: 'The temple gopuram border mirrors Ekambareswarar Temple gateways.',
        textureUrl: '/assets/article-b/1.jpg',
        macroTextureUrl: '/assets/article-b/1.jpg',
        images: ['/assets/article-b/1.jpg'],
        qrId: 'PASSPORT-TN-2026-9031'
      },
      {
        slug: 'assam-muga-silk-gamosa',
        title: 'Assam Wild Golden Muga Silk Dupatta',
        weaveName: 'Wild Golden Muga Jacquard',
        region: 'Sualkuchi, Assam',
        weaverId: insertedUsers[2]._id.toString(),
        weaverName: 'Bipul Das',
        weaverVillage: 'Sualkuchi',
        weaverAvatar: insertedUsers[2].avatar,
        price: 4200,
        weaverSharePercentage: 85,
        stock: 6,
        mood: 'sustainable-luxe',
        material: '100% Wild Muga Silk',
        hoursInvested: 45,
        giCertified: true,
        description: 'Muga silk is naturally golden and gains rich luster with every wash.',
        culturalMeaning: 'Sacred symbol of honor offered during Bihu celebrations.',
        textureUrl: '/assets/article-c/1.jpg',
        macroTextureUrl: '/assets/article-c/2.jpg',
        images: ['/assets/article-c/1.jpg', '/assets/article-c/2.jpg', '/assets/article-c/3.jpg'],
        qrId: 'PASSPORT-AS-2026-1102'
      }
    ];

    await Product.insertMany(dummyProducts);
    console.log('Seeded Handloom Products successfully!');

    console.log('Seeding initial Loom Visits...');
    await Visit.create({
      visitId: 'VISIT-901',
      customerId: insertedUsers[6]._id.toString(),
      customerName: 'Ananya Sharma',
      customerEmail: 'ananya@gmail.com',
      weaverId: insertedUsers[0]._id.toString(),
      weaverName: 'Radha Devi',
      village: 'Pochampally',
      experienceTitle: 'Pochampally Double-Ikat Masterclass & Weaving Slot',
      date: '2026-08-12',
      timeSlot: '10:00 AM — 01:00 PM',
      price: 3500,
      guestsCount: 2,
      status: 'Confirmed'
    });

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
