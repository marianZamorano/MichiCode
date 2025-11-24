import { Request, Response } from "express";
import QRCode from "qrcode";

/**
 * Genera un código QR a partir de un texto o URL.
 * Endpoint: POST /generateQR
 * Body esperado: { "text": "https://ejemplo.com" }
 */
export const generateQR = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Falta el texto o URL" });
  }

  try {
    // Generar QR en formato base64
    const qr = await QRCode.toDataURL(text);
    return res.json({ qr });
  } catch (error) {
    console.error("❌ Error generando QR:", error);
    return res.status(500).json({ error: "Error generando QR" });
  }
};