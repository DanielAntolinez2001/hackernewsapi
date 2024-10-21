import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Obtiene un usuario por su nombre de usuario.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    res
      .status(500)
      .json({ error: prismaError.message || "Internal Server Error" });
  }
};

/**
 * Crea un nuevo usuario.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, about, karma } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        about,
        karma,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    res
      .status(500)
      .json({ error: prismaError.message || "Internal Server Error" });
  }
};

/**
 * Actualiza un usuario existente por su nombre de usuario.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username } = req.params;
  const { about, karma } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { username },
      data: { about, karma },
    });
    res.json(updatedUser);
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2025") {
      res.status(404).json({ error: "User not found" });
    } else {
      res
        .status(500)
        .json({ error: prismaError.message || "Internal Server Error" });
    }
  }
};

/**
 * Elimina un usuario por su nombre de usuario.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username } = req.params;
  try {
    await prisma.user.delete({
      where: { username },
    });
    res.status(204).send();
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2025") {
      res.status(404).json({ error: "User not found" });
    } else {
      res
        .status(500)
        .json({ error: prismaError.message || "Internal Server Error" });
    }
  }
};
