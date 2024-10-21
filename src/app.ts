import express from "express";
import rutas from "./routes/routes";

/**
 * Crea una instancia de la aplicación Express.
 */
const app = express();

/**
 * Middleware para parsear las solicitudes entrantes con formato JSON.
 */
app.use(express.json());

/**
 * Define las rutas de la API bajo el prefijo "/api/v0".
 */
app.use("/api/v0", rutas);

/**
 * Exporta la instancia de la aplicación Express para ser utilizada en otras partes de la aplicación.
 */
export default app;
