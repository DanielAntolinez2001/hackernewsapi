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

## Uso

```bash
npm start
```

## Endpoints

| Método | Endpoint         | Descripción                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | /items/:id       | Obtiene un item por su ID          |
| POST   | /items           | Crea un nuevo item                 |
| PUT    | /items/:id       | Actualiza un item por su ID        |
| DELETE | /items/:id       | Elimina un item por su ID          |
| GET    | /users/:username | Obtiene un usuario por su nombre   |
| POST   | /users           | Crea un nuevo usuario              |
| PUT    | /users/:username | Actualiza un usuario por su nombre |
| DELETE | /users/:username | Elimina un usuario por su nombre   |

## Contribuir

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

- **Daniel** - [daniel.antolinez0505@gmail.com](mailto:daniel.antolinez0505@gmail.com)

---

¡Gracias por usar nuestra API!
