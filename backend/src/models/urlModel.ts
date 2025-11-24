import mongoose, { Schema, Document } from 'mongoose';

export interface UrlDoc extends Document {
  short_code: string;
  original_url: string;
  short_url: string;
  clicks: number;
  created_at: Date;
  updated_at: Date;
}

const UrlSchema = new Schema<UrlDoc>(
  {
    short_code: { type: String, required: true, unique: true, index: true },
    original_url: { type: String, required: true },
    short_url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const UrlModel = mongoose.model<UrlDoc>('Url', UrlSchema);