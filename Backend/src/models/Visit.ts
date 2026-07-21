import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
  visitId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  weaverId: string;
  weaverName: string;
  village: string;
  experienceTitle: string;
  date: string;
  timeSlot: string;
  price: number;
  guestsCount: number;
  status: 'Confirmed' | 'Completed' | 'Pending';
  createdAt: Date;
}

const VisitSchema: Schema = new Schema({
  visitId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  weaverId: { type: String, required: true },
  weaverName: { type: String, required: true },
  village: { type: String, required: true },
  experienceTitle: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  price: { type: Number, required: true },
  guestsCount: { type: Number, default: 1 },
  status: { type: String, enum: ['Confirmed', 'Completed', 'Pending'], default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

export const Visit = mongoose.model<IVisit>('Visit', VisitSchema);
