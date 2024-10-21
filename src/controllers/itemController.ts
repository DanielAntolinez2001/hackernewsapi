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
    // Crea un nuevo item en la base de datos con los datos proporcionados.
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
    // Responde con el item creado y un estado 201.
    res.status(201).json(item);
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un error 500.
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
