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

//ver -- get una
router.get('/:id',(req,res) => {

    const data = readData();
    const juego = data.juegos.find(p => p.id === parseInt(req.params.id));
    if (!juego) return res.status(404).send('No existe el juego que buscas');

    res.render ("detalleJuego", juego);

} )


//crear --post

router.post('/',(req,res) => {

    const data = readData();
    const { imagen, titulo, valoracion} = req.body;
    if (!imagen || !titulo|| !valoracion) return res.status(400).send('Necesitas rellenar todos los campos');
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
    res.json({ message: 'Juego actualizado!' });
});

//eliminar -- delete

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const juegoIndex = data.juegos.findIndex(p => p.id === id);
    if (juegoIndex === -1) return res.status(404).send('Juego no encontrado');
    data.juegos.splice(juegoIndex, 1);
    writeData(data);
    res.json({ message: 'Juego borrado correctamente' });
});



export default router;
