import app from "./app";

/**
 * Define el puerto en el que el servidor escuchará las solicitudes.
 * Si no se especifica un puerto en las variables de entorno, se usará el puerto 4000 por defecto.
 */
const PORT = process.env.PORT || 4001;

/**
 * Inicia el servidor y lo hace escuchar en el puerto especificado.
 * Una vez que el servidor está en funcionamiento, se imprime un mensaje en la consola indicando el puerto.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
