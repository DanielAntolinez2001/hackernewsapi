import { Router } from "express";
import {
  getItem,
  getAllItems,
  getItemsByDate,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController";
import {
  getUser,
  getAllUsers,
  getUsersByDate,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from "../controllers/commentController";
import {
  getAllSearches,
  getSearch,
  createSearch,
  deleteSearch,
  updateSearch,
} from "../controllers/searchController";

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
router.get("/items", getAllItems);
router.get("/items/date", getItemsByDate); // Obtener ítems por fecha
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
router.get("/users", getAllUsers);
router.get("/users/date", getUsersByDate);
router.post("/users", createUser);
router.put("/users/:username", updateUser);
router.delete("/users/:username", deleteUser);

/**
 * Rutas para los Comments
 *
 * GET /comments/:id - Obtiene un comentario por su ID.
 * GET /comments - Obtiene todos los comentarios.
 * POST /comments - Crea un nuevo comentario.
 * PUT /comments/:id - Actualiza un comentario por su ID.
 * DELETE /comments/:id - Elimina un comentario por su ID.
 */
router.post("/comments", createComment);
router.delete("/comments/:id", deleteComment);
router.get("/comments", getAllComments);
router.get("/comments/:id", getComment);
router.put("/comments/:id", updateComment);

/**
 * Rutas para las Searches
 *
 * GET /searches/:id - Obtiene una búsqueda por su ID.
 * GET /searches - Obtiene todas las búsquedas.
 * POST /searches - Crea una nueva búsqueda.
 * PUT /searches/:id - Actualiza una búsqueda por su ID.
 * DELETE /searches/:id - Elimina una búsqueda por su ID.
 */
router.get("/searches/:id", getSearch);
router.get("/searches", getAllSearches);
router.post("/searches", createSearch);
router.put("/searches/:id", updateSearch);
router.delete("/searches/:id", deleteSearch);

/**
 * Exporta el enrutador para ser utilizado en otras partes de la aplicación.
 */
export default router;
