import express from 'express';
import fs from 'fs';


const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

//ver -- get todo

router.get('/',(req,res) => {

    const data = readData();
    res.render ("consolas", data);



} )

//ver -- get una
router.get('/:id',(req,res) => {

    const data = readData();
    const consola = data.consolas.find(p => p.id === parseInt(req.params.id));
    if (!consola) return res.status(404).send('La consola que buscas no existe');

    res.render ("detalleConsola", juego);

} )


//crear --post

router.post('/',(req,res) => {

    const data = readData();
    const { imagen, nombre, valoracion} = req.body;
    if (!imagen || !nombre|| !valoracion) return res.status(400).send('Necesitas rellenar todos los campos');
    const nuevaConsola = { id: data.consolas.length + 1, imagen, nombre, valoracion };
    data.consolas.push(nuevaConsola);
    writeData(data);
    res.json(nuevaConsola);

})

//modificar -- put

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const consolaIndex = data.consolas.findIndex(p => p.id === id);
    if (consolaIndex === -1) return res.status(404).send('Consola no encontrado');
    data.consolas[consolaIndex] = { ...data.consolas[consolaIndex], ...req.body };
    writeData(data);
    res.json({ message: 'Consola actualizada!' });
});

//eliminar -- delete

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const consolaIndex = data.consolas.findIndex(p => p.id === id);
    if (consolaIndex === -1) return res.status(404).send('Consola no encontrado');
    data.consolas.splice(consolaIndex, 1);
    writeData(data);
    res.json({ message: 'Consola borrada correctamente' });
});



export default router;
