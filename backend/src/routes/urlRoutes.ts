import { Router } from "express";
import { shortenUrl, redirectUrl, listUrls } from "../controllers/urlController.js";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/urls", listUrls);
router.get("/:id", redirectUrl);

export default router;