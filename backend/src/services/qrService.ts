import { QrModel } from "../models/qrModel.js";

export const saveQrHistory = async (content: string) => {
  if (!content || content.trim() === "") {
    throw new Error("El contenido del QR es requerido.");
  }

  const doc = await QrModel.create({
    content: content.trim(),
  });

  return {
    content: doc.content,
    createdAt: doc.createdAt,
    _id: doc._id,
  };
};

export const getAllQrHistory = async () => {
  return await QrModel.find().sort({ createdAt: -1 }).lean();
};