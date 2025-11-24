import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "qrurl",
  password: process.env.DB_PASSWORD || "admin123",
  port: Number(process.env.DB_PORT) || 5432,
});

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión a la base de datos establecida");
    client.release();
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  }
};

export default pool;