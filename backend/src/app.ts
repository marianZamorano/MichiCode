import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import urlRoutes from "./routes/urlRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/", urlRoutes);
app.use("/", qrRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

export default app;