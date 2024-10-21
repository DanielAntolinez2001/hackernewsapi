import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Obtiene todos los comentarios.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getAllComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Busca todos los comentarios en la base de datos.
    const comments = await prisma.comment.findMany();
    // Responde con los comentarios en formato JSON.
    res.json(comments);
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un error 500.
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Obtiene un comentario por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const getComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extrae el ID del comentario de los parámetros de la solicitud.
  try {
    // Busca un comentario único en la base de datos por su ID.
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      // Si no se encuentra el comentario, responde con un error 404.
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    // Si se encuentra el comentario, responde con el comentario en formato JSON.
    res.json(comment);
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un error 500.
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Crea un nuevo comentario.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text, author, itemId } = req.body; // Extrae el texto, autor y ID del ítem del cuerpo de la solicitud.
  try {
    // Crea un nuevo comentario en la base de datos.
    const comment = await prisma.comment.create({
      data: {
        text,
        author,
        itemId,
      },
    });

    // Aumentar el karma del autor del comentario.
    await prisma.user.update({
      where: { username: author },
      data: { karma: { increment: 1 } }, // Incrementar el karma en 1.
    });

    // Responde con el comentario creado en formato JSON y un código de estado 201.
    res.status(201).json(comment);
  } catch (error) {
    // Si ocurre un error en el servidor, responde con un error 500.
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Actualiza un comentario por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const updateComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extrae el ID del comentario de los parámetros de la solicitud.
  const { text } = req.body; // Extrae el nuevo texto del cuerpo de la solicitud.
  try {
    // Actualiza el comentario en la base de datos.
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { text },
    });
    // Responde con el comentario actualizado en formato JSON.
    res.json(updatedComment);
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2025") {
      // Si no se encuentra el comentario, responde con un error 404.
      res.status(404).json({ error: "Comment not found" });
    } else {
      // Si ocurre un error en el servidor, responde con un error 500.
      res
        .status(500)
        .json({ error: prismaError.message || "Internal Server Error" });
    }
  }
};

/**
 * Elimina un comentario por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns void
 */
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extrae el ID del comentario de los parámetros de la solicitud.
  try {
    // Elimina el comentario de la base de datos.
    await prisma.comment.delete({
      where: { id },
    });
    // Responde con un código de estado 204 para indicar que se eliminó con éxito.
    res.status(204).send();
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    if (prismaError.code === "P2025") {
      // Si no se encuentra el comentario, responde con un error 404.
      res.status(404).json({ error: "Comment not found" });
    } else {
      // Si ocurre un error en el servidor, responde con un error 500.
      res
        .status(500)
        .json({ error: prismaError.message || "Internal Server Error" });
    }
  }
};
