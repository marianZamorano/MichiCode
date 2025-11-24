import { Router } from "express";
import { generateQR } from "../controllers/qrController.js";

const router = Router();

router.post("/generateQR", generateQR);

export default router;