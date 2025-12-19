import { Request, Response } from "express";
import { saveQrHistory, getAllQrHistory } from "../services/qrService.js";

export const saveQr = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ message: "Contenido (content) es requerido" });
    }
    const qrRecord = await saveQrHistory(content);
    return res.status(201).json(qrRecord);
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: error.message || "Error al guardar el QR" });
  }
};

export const getQrHistory = async (_: Request, res: Response) => {
  try {
    const history = await getAllQrHistory();
    return res.json(history);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Error listando historial de QR" });
  }
};
