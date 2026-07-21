import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  slug: string;
  title: string;
  weaveName: string;
  region: string;
  weaverId: string;
  weaverName: string;
  weaverVillage: string;
  weaverAvatar?: string;
  price: number;
  weaverSharePercentage: number;
  stock: number;
  mood: string;
  material: string;
  hoursInvested: number;
  giCertified: boolean;
  description: string;
  culturalMeaning: string;
  textureUrl: string;
  macroTextureUrl?: string;
  images: string[];
  dimensions?: string;
  yarnSpec?: string;
  b2bAvailable?: boolean;
  qrId?: string;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  weaveName: { type: String, required: true },
  region: { type: String, required: true },
  weaverId: { type: String, required: true },
  weaverName: { type: String, required: true },
  weaverVillage: { type: String, required: true },
  weaverAvatar: { type: String },
  price: { type: Number, required: true },
  weaverSharePercentage: { type: Number, default: 82 },
  stock: { type: Number, default: 3 },
  mood: { type: String, required: true },
  material: { type: String, required: true },
  hoursInvested: { type: Number, required: true },
  giCertified: { type: Boolean, default: true },
  description: { type: String, required: true },
  culturalMeaning: { type: String, required: true },
  textureUrl: { type: String, required: true },
  macroTextureUrl: { type: String },
  images: [{ type: String }],
  dimensions: { type: String, default: '5.50m Saree + 0.80m Blouse' },
  yarnSpec: { type: String, default: '300D Mulberry Silk & Botanical Dyes' },
  b2bAvailable: { type: Boolean, default: true },
  qrId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
