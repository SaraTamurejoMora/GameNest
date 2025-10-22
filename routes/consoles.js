import express from 'express';
import fs from 'fs';


const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));


router.get('/crear', (req, res) => {
  res.render('crearConsola');
});

//ver -- get todo

router.get('/',(req,res) => {

    const data = readData();
    res.render ("consolas", data);



} )

router.get('/editConsola/:id', (req, res) => {
    const data = readData();
    const consola = data.consolas.find(p => p.id === parseInt(req.params.id));
    
    if (!consola) return res.status(404).send('Consola no encontrada');

    res.render("editConsola", {consola});
});

//ver -- get una
router.get('/:id',(req,res) => {

    const data = readData();
    const consola = data.consolas.find(p => p.id === parseInt(req.params.id));
    if (!consola) return res.status(404).send('La consola que buscas no existe');

    res.render ("consolaDetalle", {consola});

} )

//crear --post


router.post('/',(req,res) => {

    const data = readData();
    const { imagen, nombre, valoracion} = req.body;
    if (!imagen || !nombre|| !valoracion) return res.status(400).send('Necesitas rellenar todos los campos');
    const nuevaConsola = { id: crearIdUnicoConsola(data), imagen, nombre, valoracion };
    data.consolas.push(nuevaConsola);
    writeData(data);
     const newdata = readData();
    res.render ("consolas", newdata);

})

//modificar -- put

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const consolaIndex = data.consolas.findIndex(p => p.id === id);
    if (consolaIndex === -1) return res.status(404).send('Consola no encontrada');
    data.consolas[consolaIndex] = { ...data.consolas[consolaIndex], ...req.body };
    writeData(data);
    const newdata = readData();
    res.render ("consolas", newdata);
});


//eliminar -- delete

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const consolaIndex = data.consolas.findIndex(p => p.id === id);
    if (consolaIndex === -1) return res.status(404).send('Consola no encontrado');
    data.consolas.splice(consolaIndex, 1);
    writeData(data);
    const newdata = readData();
    res.render ("consolas", newdata);
});

function crearIdUnicoConsola(data) {
  const id = Math.floor(1000000000 + Math.random() * 9000000000);
  const existe = data.consolas.findIndex(c => c.id === id);
  if(existe === -1){
     return id;
  }
  return crearIdUnicoConsola(data);
}


export default router;
