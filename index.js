import express from 'express';
import consolestRoutes from './routes/consoles.js';
import gamesRoutesRoutes from './routes/games.js';
//import methodOverride from 'method-override';
import {PORT, SECRET_JWT_KEY} from './config.js'
import { UserRepository } from './user-repository.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs'); // Motor de plantilles
app.set('views', './views'); // Ubicació de les plantilles



//inicio middleware
app.use((req,res,next)=>{
    const token =req.cookies.access_token
    req.session={user: null}
    try{
        const data=jwt.verify(token,SECRET_JWT_KEY)
        req.session.user=data
    }catch(error){
        req.session.user=null
    }
    next() 
})

app.use((req,res,next) =>{
    const token = req.cookies.access_token
    req.session = {user:null}
    try{
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data
    }catch(error){
    req.session.user = null
    }
})

app.use('/consoles', consolesRoutes);
app.use('/games', gamesRoutes);

app.get('/',(req,res) =>{
    const {user} = req.session
    res.render('login',user)
});

/*--------------------------
        REGISTRO
--------------------------*/
app.post('/register', async (req,res)=>{
    
    const {username,password}=req.body
    console.log(req.body)
    try{
        const id= await UserRepository.create({username,password});
        res.send({id})
    }catch(error){
        res.status(400).send(error.message)
    }
});

/*--------------------------
        INICIO SESIÓN
--------------------------*/

