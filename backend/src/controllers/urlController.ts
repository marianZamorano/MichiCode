import { Request, Response } from "express";
import { nanoid } from "nanoid";
import pool from "../config/db.js"; // conexión a PostgreSQL

/**
 * Acorta una URL y la guarda en la base de datos.
 * Endpoint: POST /shorten
 * Body esperado: { "url": "https://ejemplo.com" }
 */
export const shortenUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Falta la URL" });
  }

  try {
    const shortId = nanoid(6);
    const shortUrl = `http://localhost:3001/${shortId}`;

    // Guardar en la base de datos
    await pool.query(
      "INSERT INTO urls (original_url, short_id, short_url) VALUES ($1, $2, $3)",
      [url, shortId, shortUrl]
    );

    return res.json({ shortUrl });
  } catch (error) {
    console.error("❌ Error acortando URL:", error);
    return res.status(500).json({ error: "Error acortando URL" });
  }
};

/**
 * Redirige una URL corta a la original.
 * Endpoint: GET /:id
 */
export const redirectUrl = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("URL no encontrada");
    }

    const originalUrl = result.rows[0].original_url;
    return res.redirect(originalUrl);
  } catch (error) {
    console.error("❌ Error redirigiendo URL:", error);
    return res.status(500).json({ error: "Error redirigiendo URL" });
  }
};

/**
 * Lista todas las URLs almacenadas.
 * Endpoint: GET /urls
 */
export const listUrls = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM urls ORDER BY created_at DESC");
    return res.json(result.rows);
  } catch (error) {
    console.error("❌ Error listando URLs:", error);
    return res.status(500).json({ error: "Error listando URLs" });
  }
};