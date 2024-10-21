import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Obtiene todos los registros de búsqueda.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getAllSearches = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const searches = await prisma.search.findMany();
    res.json(searches);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Obtiene un registro de búsqueda por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getSearch = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const search = await prisma.search.findUnique({
      where: { id },
    });
    if (!search) {
      res.status(404).json({ error: "Search not found" });
      return;
    }
    res.json(search);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Crea un nuevo registro de búsqueda.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const createSearch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    url,
    author,
    points,
    numComments,
    createdAt,
    query,
    hitsPerPage,
    page,
  } = req.body;
  try {
    const search = await prisma.search.create({
      data: {
        title,
        url,
        author,
        points,
        numComments,
        createdAt: new Date(createdAt), // Asegúrate de manejar la fecha correctamente
        query,
        hitsPerPage,
        page,
      },
    });
    res.status(201).json(search);
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    res
      .status(500)
      .json({ error: prismaError.message || "Internal Server Error" });
  }
};

/**
 * Actualiza un registro de búsqueda por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const updateSearch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    title,
    url,
    author,
    points,
    numComments,
    createdAt,
    query,
    hitsPerPage,
    page,
  } = req.body;
  try {
    const updatedSearch = await prisma.search.update({
      where: { id },
      data: {
        title,
        url,
        author,
        points,
        numComments,
        createdAt: new Date(createdAt), // Asegúrate de manejar la fecha correctamente
        query,
        hitsPerPage,
        page,
      },
    });
    res.json(updatedSearch);
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2025") {
      res.status(404).json({ error: "Search not found" });
    } else {
      res
        .status(500)
        .json({ error: prismaError.message || "Internal Server Error" });
    }
  }
};

/**
 * Elimina un registro de búsqueda por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const deleteSearch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.search.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2025") {
      res.status(404).json({ error: "Search not found" });
    } else {
      res
        .status(500)
        .json({ error: prismaError.message || "Internal Server Error" });
    }
  }
};
