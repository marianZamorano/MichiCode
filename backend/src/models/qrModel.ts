import mongoose, { Document, Schema } from "mongoose";

export interface IQr extends Document {
  content: string;
  createdAt: Date;
}

const QrSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const QrModel = mongoose.model<IQr>("Qr", QrSchema);
