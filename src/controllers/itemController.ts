import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Obtiene un item por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    // Busca un item único en la base de datos por su ID, incluyendo sus hijos.
    const item = await prisma.item.findUnique({
      where: { id },
      include: { children: true },
    });
    if (!item) {
      // Si no se encuentra el item, responde con un error 404.
      res.status(404).json({ error: "Item not found" });
      return;
    }
    // Si se encuentra el item, responde con el item en formato JSON.
    res.json(item);
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un error 500.
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Obtiene todos los items.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Busca todos los items en la base de datos.
    const items = await prisma.item.findMany();
    // Responde con los items en formato JSON.
    res.json(items);
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un error 500.
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Obtiene ítems por rango de fechas de publicación.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getItemsByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { startDate, endDate } = req.query;

  // Validar que se proporcionaron las fechas
  if (!startDate || !endDate) {
    res.status(400).json({ error: "Start date and end date are required" });
    return;
  }

  try {
    const items = await prisma.item.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate as string), // Fecha de inicio
          lte: new Date(endDate as string), // Fecha de fin
        },
      },
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Crea un nuevo item.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { author, title, url, text, points, parentId } = req.body;
  try {
    const item = await prisma.item.create({
      data: {
        author,
        title,
        url,
        text,
        points,
        parentId,
        createdAt: new Date(),
      },
    });

    // Aumentar el karma del autor
    await prisma.user.update({
      where: { username: author },
      data: { karma: { increment: 1 } }, // Incrementar en 1
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Actualiza un item por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { author, title, url, text, points, parentId } = req.body;
  try {
    const updatedItem = await prisma.item.update({
      where: { id },
      data: { author, title, url, text, points, parentId },
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Elimina un item por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.item.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
