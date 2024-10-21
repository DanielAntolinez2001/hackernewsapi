import { PrismaClient } from "@prisma/client";

/**
 * Instancia única de PrismaClient para interactuar con la base de datos.
 * PrismaClient es un cliente de base de datos que permite realizar consultas
 * y operaciones en la base de datos de manera sencilla y tipada.
 */
const prisma = new PrismaClient();

/**
 * Exporta la instancia de PrismaClient para ser utilizada en otras partes de la aplicación.
 */
export default prisma;
