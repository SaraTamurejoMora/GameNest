# GameNest

**GameNest** es una aplicación web hecha con **Node.js**, **Express** y **EJS** donde se pueden gestionar **juegos** y **consolas**.  
La idea era crear algo sencillo pero con estilo, así que le di un toque retro tipo *Game Boy Azul*.  
Todos los datos se guardan en un archivo local llamado `db/db.json`.

---

## Acceso y seguridad

No se puede entrar a las secciones de **juegos** o **consolas** si no estás logueado.  
Para eso añadí un **middleware** que comprueba si hay sesión activa antes de dejar pasar al usuario.

Esto evita que alguien escriba directamente la URL o se cuele en páginas que no debería.  
Solo los usuarios que han iniciado sesión pueden **crear, editar o borrar** cosas.

---
## Registro y autenticación

La aplicación tiene una parte de **registro e inicio de sesión** para los usuarios.

La vista `register.ejs` muestra un formulario muy simple donde el usuario puede crear una cuenta nueva.  
Esta página está pensada para ser la puerta de entrada: si no estás logueado, no puedes acceder a `/protected`, ni a ninguna ruta de **juegos** o **consolas**.

En el backend, hay un **middleware** que se encarga de comprobar si el usuario tiene sesión activa antes de permitir el acceso a las rutas privadas.  
Si intentas entrar a una ruta protegida sin estar autenticado, te redirige a una página que muestra un mensaje tipo *“No tienes acceso”*.

**Flujo de usuario:**
1. Te registras desde `/register`.
2. El sistema guarda tu usuario.
3. Luego puedes iniciar sesión.
4. Si el login es correcto, ya puedes acceder a `/protected`, `/games` o `/consoles`.

Así evito que la gente entre escribiendo rutas directamente sin tener permisos.

---


## Qué hace la aplicación

- Ver listas de **juegos** o **consolas**
- Crear nuevos registros
- Editar los existentes
- Ver los detalles individuales
- Eliminar elementos con confirmación
- Guardar todo automáticamente en `db/db.json`

---


## Rutas principales

### Consolas (`/consoles`)

**Archivo:** `routes/consoles.js`

| Método | Ruta | Qué hace | Vista |
|:-------|:------|:----------|:------|
| **GET** | `/consoles` | Muestra todas las consolas | `consolas.ejs` |
| **GET** | `/consoles/crear` | Muestra el formulario para crear una nueva consola | `crearConsola.ejs` |
| **POST** | `/consoles` | Guarda la consola nueva en el JSON | Redirige a `/consoles` |
| **GET** | `/consoles/:id` | Muestra los detalles de una consola | `detalleConsola.ejs` |
| **GET** | `/consoles/editConsola/:id` | Muestra el formulario de edición | `editConsola.ejs` |
| **PUT** | `/consoles/:id` | Actualiza los datos de una consola | Redirige a `/consoles` |
| **DELETE** | `/consoles/:id` | Elimina una consola | Redirige a `/consoles` |

**Funciones que uso dentro:**

```js
function readData() { ... }     // Lee el archivo JSON
function writeData() { ... }    // Escribe los cambios
function crearIdUnicoConsola() { ... } // Genera un ID aleatorio y único
```
Esta última la uso porque el crear me daba problemas con los id, ya que algunos se repetía, así que decidí generarlos random.

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

Las vistas están en `/views` y usan **EJS** con un diseño retro.  
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


