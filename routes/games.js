import express from 'express';
import fs from 'fs';


const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));




//ver -- get todo

router.get('/',(req,res) => {

    const data = readData();
    res.render ("juegos", data);



} )


//crear juegos

router.get('/crear', (req, res) => {
  res.render('crearJuego');
});

// Crear un nuevo juego
router.post('/', (req, res) => {
  const data = readData();
  const { titulo, descripcion, anio_publicacion, valoracion, foto } = req.body;

  if (!titulo || !foto || !valoracion || !descripcion || !anio_publicacion) {
    return res.status(400).send('Faltan campos obligatorios (título, foto, valoración)');
  }

    const nuevoJuego = { id: data.juegos.length + 1, titulo, descripcion, anio_publicacion, valoracion, foto };


  data.juegos.push(nuevoJuego);
  writeData(data);
  res.redirect('/games');
});

router.get('/editGames/:id', (req, res) => {
    const data = readData();
    const juego = data.juegos.find(p => p.id === parseInt(req.params.id));
    
    if (!juego) return res.status(404).send('Juego no encontrado');

    res.render("editGames", {juego});
});


//ver -- get una
router.get('/:id',(req,res) => {

    const data = readData();
    const juego = data.juegos.find(p => p.id === parseInt(req.params.id));
    if (!juego) return res.status(404).send('No existe el juego que buscas');

    res.render ("detalleJuego", {juego});

} )




//crear --post

router.post('/',(req,res) => {

    const data = readData();
    const { foto, titulo, valoracion} = req.body;
    if (!foto || !titulo|| !valoracion) return res.status(400).send('Necesitas rellenar todos los campos');
    const nuevoJuego = { id: data.juegos.length + 1, imagen, titulo, valoracion };
    data.juegos.push(nuevoJuego);
    writeData(data);
    res.json(nuevoJuego);

})

//modificar -- put

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const juegoIndex = data.juegos.findIndex(p => p.id === id);
    if (juegoIndex === -1) return res.status(404).send('Juego no encontrado');
    data.juegos[juegoIndex] = { ...data.juegos[juegoIndex], ...req.body };
    writeData(data);
    res.redirect ("/games");
});

//eliminar -- delete

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const juegoIndex = data.juegos.findIndex(p => p.id === id);
    if (juegoIndex === -1) return res.status(404).send('Juego no encontrado');
    data.juegos.splice(juegoIndex, 1);
    writeData(data);
   const newdata = readData();
    res.render ("juegos", newdata);
});



export default router;
