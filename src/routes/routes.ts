import { Router } from "express";
import {
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

/**
 * Crea una instancia del enrutador de Express.
 */
const router = Router();

/**
 * Rutas para los Items
 *
 * GET /items/:id - Obtiene un item por su ID.
 * POST /items - Crea un nuevo item.
 * PUT /items/:id - Actualiza un item por su ID.
 * DELETE /items/:id - Elimina un item por su ID.
 */
router.get("/items/:id", getItem);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

/**
 * Rutas para los Users
 *
 * GET /users/:username - Obtiene un usuario por su nombre de usuario.
 * POST /users - Crea un nuevo usuario.
 * PUT /users/:username - Actualiza un usuario por su nombre de usuario.
 * DELETE /users/:username - Elimina un usuario por su nombre de usuario.
 */
router.get("/users/:username", getUser);
router.post("/users", createUser);
router.put("/users/:username", updateUser);
router.delete("/users/:username", deleteUser);

/**
 * Exporta el enrutador para ser utilizado en otras partes de la aplicación.
 */
export default router;
