import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'customer' | 'weaver';
  avatar?: string;
  village?: string;
  region?: string;
  specialty?: string;
  yearsWeaving?: number;
  biography?: string;
  awards?: string[];
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer', 'weaver'], required: true },
  avatar: { type: String },
  village: { type: String },
  region: { type: String },
  specialty: { type: String },
  yearsWeaving: { type: Number },
  biography: { type: String },
  awards: [{ type: String }],
  bankName: { type: String, default: 'State Bank of India' },
  accountNumber: { type: String, default: '3099882201' },
  ifscCode: { type: String, default: 'SBIN0001002' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
