import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { logger } from "./middlewares/logger.js";
import urlRoutes from "./routes/urlRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/", urlRoutes);
app.use("/", qrRoutes);

const urlStore: { [key: string]: string } = {};

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Falta la URL" });
  }

  const id = nanoid(6);
  urlStore[id] = url;

  const shortUrl = `http://localhost:3001/${id}`;
  res.json({ shortUrl });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const originalUrl = urlStore[id];

  if (!originalUrl) {
    return res.status(404).send("URL no encontrada");
  }

  res.redirect(originalUrl);
});

app.post("/generateQR", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Falta el texto o URL" });
  }

  try {
    const qr = await QRCode.toDataURL(text);
    res.json({ qr });
  } catch (error) {
    res.status(500).json({ error: "Error generando QR" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

export default app;