import express from 'express';
import fs from 'fs';


const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

//ver -- get todo

//ver -- get una

//crear --post

//modificar -- put

//eliminar -- delete

export default router;
