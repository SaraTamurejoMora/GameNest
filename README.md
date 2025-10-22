# GameNest

**GameNest** es una aplicación web hecha con **Node.js**, **Express** y **EJS** para gestionar una colección de **juegos** y **consolas**.  
La interfaz tiene un estilo retro tipo *Game Boy Azul*, y los datos se guardan en un archivo local (`db/db.json`).

---

## Acceso protegido

No se puede acceder a las secciones de **juegos** o **consolas** sin tener usuario.  
Hay un **middleware de autenticación** que comprueba si el usuario está logueado antes de permitir el acceso a las rutas protegidas (`/protected`, `/games`, `/consoles`, etc.).

Esto evita que alguien entre directamente escribiendo la URL o salte entre páginas sin permisos.  
Solo los usuarios autenticados pueden crear, editar o eliminar contenido.

---

## Qué hace la aplicación

- Ver listas de **juegos** o **consolas**
- Crear nuevos registros
- Editar los existentes
- Ver los detalles individuales
- Eliminar elementos con confirmación
- Guardar todo automáticamente en `db/db.json`

---

---

## Rutas principales

### Consolas (`/consoles`)

Archivo: `routes/consoles.js`

| Método | Ruta | Descripción | Vista |
|:-------|:------|:-------------|:------|
| **GET** | `/consoles` | Muestra la lista de consolas | `consolas.ejs` |
| **GET** | `/consoles/crear` | Formulario para crear una consola nueva | `crearConsola.ejs` |
| **POST** | `/consoles` | Guarda la nueva consola en el JSON | Redirige a `/consoles` |
| **GET** | `/consoles/:id` | Muestra los detalles de una consola | `detalleConsola.ejs` |
| **GET** | `/consoles/editConsola/:id` | Muestra el formulario de edición | `editConsola.ejs` |
| **PUT** | `/consoles/:id` | Actualiza los datos de una consola | Redirige a `/consoles` |
| **DELETE** | `/consoles/:id` | Elimina una consola | Redirige a `/consoles` |

Funciones internas destacadas:
- `readData()` → Lee el archivo `db.json`
- `writeData()` → Escribe los datos actualizados
- `crearIdUnicoConsola()` → Genera un ID aleatorio **no repetido**, para evitar duplicados (esto se añadió tras tener problemas con IDs repetidos)

---

### Juegos (`/games`)

Archivo: `routes/games.js`

| Método | Ruta | Descripción | Vista |
|:-------|:------|:-------------|:------|
| **GET** | `/games` | Muestra la lista de juegos | `juegos.ejs` |
| **GET** | `/games/crear` | Formulario para crear juego | `crearJuego.ejs` |
| **POST** | `/games` | Crea un nuevo juego | Redirige a `/games` |
| **GET** | `/games/:id` | Muestra los detalles de un juego | `detalleJuego.ejs` |
| **GET** | `/games/editGames/:id` | Muestra el formulario de edición | `editGames.ejs` |
| **PUT** | `/games/:id` | Actualiza un juego existente | Redirige a `/games` |
| **DELETE** | `/games/:id` | Elimina un juego | Redirige a `/games` |

Funciones internas destacadas:
- `readData()` → Lee el archivo `db.json`
- `writeData()` → Guarda los cambios
- `crearIdUnicoJuego()` → Genera IDs aleatorios únicos (para evitar conflictos al crear juegos nuevos)

---

## Vistas (EJS)

Las vistas están en `/views` y usan **EJS** con un diseño uniforme retro.  
Cada tipo (juego o consola) tiene sus propias pantallas de listado, detalle y formularios.

| Archivo | Descripción |
|:---------|:-------------|
| `juegos.ejs` | Lista de juegos |
| `detalleJuego.ejs` | Detalle de un juego |
| `editGames.ejs` | Formulario para editar |
| `crearJuego.ejs` | Formulario para crear |
| `consolas.ejs` | Lista de consolas |
| `detalleConsola.ejs` | Detalle de una consola |
| `editConsola.ejs` | Formulario para editar |
| `crearConsola.ejs` | Formulario para crear |

---

## Funcionamiento general

1. Se accede a `/protected` (solo disponible para usuarios con sesión iniciada).  
2. Desde ahí se puede ir a la lista de juegos o consolas.  
3. Cada tarjeta tiene un botón **Ver** para ver los detalles.  
4. Desde la vista de detalle se puede **editar** o **eliminar** el elemento.  
5. Los formularios usan `method-override` para soportar métodos PUT y DELETE.  
6. Todos los cambios se guardan en `db/db.json`.

---

## Tecnologías utilizadas

- Node.js  
- Express.js  
- EJS  
- Method-Override (para PUT y DELETE)  
- CSS personalizado estilo retro  
- Middleware de autenticación propio

---


