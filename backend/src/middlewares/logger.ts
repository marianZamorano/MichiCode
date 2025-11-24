import { Request, Response, NextFunction } from "express";

/**
 * Middleware de logging para registrar cada petición HTTP.
 * Muestra método, ruta, código de estado y tiempo de respuesta.
 */
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Cuando la respuesta termine, calculamos el tiempo
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`;
    console.log(log);
  });

  next();
};