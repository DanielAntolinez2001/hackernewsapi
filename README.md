# Hacker News API

![Hacker News Logo](https://news.ycombinator.com/favicon.ico)

## Descripción

Este proyecto es una API que permite interactuar con los datos de Hacker News. Proporciona endpoints para obtener las últimas noticias, los comentarios más recientes y los detalles de los usuarios.

## Características

- Obtener las últimas noticias
- Consultar comentarios recientes
- Información detallada de usuarios

## Requisitos

- Node.js >= 14.x
- npm >= 6.x

## Instalación

```bash
git clone https://github.com/tu-usuario/hacker-news-api.git
cd hacker-news-api
npm install
```

## Ejecución

```bash
ts-node src/server.ts
```

## Endpoints

| Método | Endpoint                      | Descripción                                      |
| ------ | ----------------------------- | ------------------------------------------------ |
| GET    | /users                        | Obtener todos los usuarios                       |
| GET    | /users/:username              | Obtener un usuario por nombre de usuario         |
| GET    | /users/date?startDate&endDate | Obtener usuarios por rango de fechas de creación |
| POST   | /users                        | Crear un nuevo usuario                           |
| PUT    | /users/:username              | Actualizar un usuario por nombre de usuario      |
| DELETE | /users/:username              | Eliminar un usuario por nombre de usuario        |
| GET    | /searches                     | Obtener todos los registros de búsqueda          |
| GET    | /searches/:id                 | Obtener un registro de búsqueda por ID           |
| POST   | /searches                     | Crear un nuevo registro de búsqueda              |
| PUT    | /searches/:id                 | Actualizar un registro de búsqueda por ID        |
| DELETE | /searches/:id                 | Eliminar un registro de búsqueda por ID          |
| GET    | /comments                     | Obtener todos los comentarios                    |
| GET    | /comments/:id                 | Obtener un comentario por ID                     |
| POST   | /comments                     | Crear un nuevo comentario                        |
| PUT    | /comments/:id                 | Actualizar un comentario por ID                  |
| DELETE | /comments/:id                 | Eliminar un comentario por ID                    |
| GET    | /items                        | Obtener todos los items                          |
| GET    | /items/:id                    | Obtener un item por ID                           |
| GET    | /items/date?startDate&endDate | Obtener ítems por rango de fechas de publicación |
| POST   | /items                        | Crear un nuevo item                              |
| PUT    | /items/:id                    | Actualizar un item por ID                        |
| DELETE | /items/:id                    | Eliminar un item por ID                          |

## Ejemplos de Datos y Respuestas

### Usuarios

#### Crear un nuevo usuario

**Solicitud:**

```json
{
  "username": "nuevo_usuario",
  "email": "nuevo_usuario@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "username": "nuevo_usuario",
  "email": "nuevo_usuario@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Comentarios

#### Crear un nuevo comentario

**Solicitud:**

```json
{
  "userId": 1,
  "itemId": 123,
  "text": "Este es un comentario de ejemplo.",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "userId": 1,
  "itemId": 123,
  "text": "Este es un comentario de ejemplo.",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Ítems

#### Crear un nuevo item

**Solicitud:**

```json
{
  "title": "Nuevo Item",
  "url": "https://ejemplo.com/nuevo-item",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "title": "Nuevo Item",
  "url": "https://ejemplo.com/nuevo-item",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Obtener todos los usuarios

**Solicitud:**

```http
GET /users
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "username": "usuario1",
    "email": "usuario1@example.com",
    "createdAt": "2023-10-01T12:00:00Z"
  },
  {
    "id": 2,
    "username": "usuario2",
    "email": "usuario2@example.com",
    "createdAt": "2023-10-02T12:00:00Z"
  }
]
```

### Obtener un usuario por nombre de usuario

**Solicitud:**

```http
GET /users/usuario1
```

**Respuesta:**

```json
{
  "id": 1,
  "username": "usuario1",
  "email": "usuario1@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Obtener usuarios por rango de fechas de creación

**Solicitud:**

```http
GET /users/date?startDate=2023-10-01&endDate=2023-10-02
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "username": "usuario1",
    "email": "usuario1@example.com",
    "createdAt": "2023-10-01T12:00:00Z"
  }
]
```

### Actualizar un usuario por nombre de usuario

**Solicitud:**

```json
PUT /users/usuario1
{
    "email": "nuevo_email@example.com"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "username": "usuario1",
  "email": "nuevo_email@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Eliminar un usuario por nombre de usuario

**Solicitud:**

```http
DELETE /users/usuario1
```

**Respuesta:**

```json
{
  "message": "Usuario eliminado exitosamente"
}
```

### Obtener todos los registros de búsqueda

**Solicitud:**

```http
GET /searches
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "query": "ejemplo de búsqueda",
    "userId": 1,
    "createdAt": "2023-10-01T12:00:00Z"
  }
]
```

### Obtener un registro de búsqueda por ID

**Solicitud:**

```http
GET /searches/1
```

**Respuesta:**

```json
{
  "id": 1,
  "query": "ejemplo de búsqueda",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Actualizar un registro de búsqueda por ID

**Solicitud:**

```json
PUT /searches/1
{
    "query": "nueva búsqueda"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "query": "nueva búsqueda",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Eliminar un registro de búsqueda por ID

**Solicitud:**

```http
DELETE /searches/1
```

**Respuesta:**

```json
{
  "message": "Registro de búsqueda eliminado exitosamente"
}
```

### Obtener todos los comentarios

**Solicitud:**

```http
GET /comments
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "userId": 1,
    "itemId": 123,
    "text": "Este es un comentario de ejemplo.",
    "createdAt": "2023-10-01T12:00:00Z"
  }
]
```

### Obtener un comentario por ID

**Solicitud:**

```http
GET /comments/1
```

**Respuesta:**

```json
{
  "id": 1,
  "userId": 1,
  "itemId": 123,
  "text": "Este es un comentario de ejemplo.",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Actualizar un comentario por ID

**Solicitud:**

```json
PUT /comments/1
{
    "text": "Texto actualizado del comentario."
}
```

**Respuesta:**

```json
{
  "id": 1,
  "userId": 1,
  "itemId": 123,
  "text": "Texto actualizado del comentario.",
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Eliminar un comentario por ID

**Solicitud:**

```http
DELETE /comments/1
```

**Respuesta:**

```json
{
  "message": "Comentario eliminado exitosamente"
}
```

### Obtener todos los items

**Solicitud:**

```http
GET /items
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "title": "Nuevo Item",
    "url": "https://ejemplo.com/nuevo-item",
    "userId": 1,
    "createdAt": "2023-10-01T12:00:00Z"
  }
]
```

### Obtener un item por ID

**Solicitud:**

```http
GET /items/1
```

**Respuesta:**

```json
{
  "id": 1,
  "title": "Nuevo Item",
  "url": "https://ejemplo.com/nuevo-item",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Obtener ítems por rango de fechas de publicación

**Solicitud:**

```http
GET /items/date?startDate=2023-10-01&endDate=2023-10-02
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "title": "Nuevo Item",
    "url": "https://ejemplo.com/nuevo-item",
    "userId": 1,
    "createdAt": "2023-10-01T12:00:00Z"
  }
]
```

### Actualizar un item por ID

**Solicitud:**

```json
PUT /items/1
{
    "title": "Título actualizado"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "title": "Título actualizado",
  "url": "https://ejemplo.com/nuevo-item",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

### Eliminar un item por ID

**Solicitud:**

```http
DELETE /items/1
```

**Respuesta:**

```json
{
  "message": "Item eliminado exitosamente"
}
```

### Búsquedas

#### Crear un nuevo registro de búsqueda

**Solicitud:**

```json
{
  "query": "ejemplo de búsqueda",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "query": "ejemplo de búsqueda",
  "userId": 1,
  "createdAt": "2023-10-01T12:00:00Z"
}
```

## Contribuir

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Contacto

- **Daniel** - [daniel.antolinez0505@gmail.com](mailto:daniel.antolinez0505@gmail.com)

---

¡Gracias por usar nuestra API!
