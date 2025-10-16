import bcrypt from 'bcrypt'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'
const {Schema}=new DBLocal({path:'./db'})

const User = Schema('User',{
    _id:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true}
})

export class UserRepository{
    static async create ({username,password}){
        Validation.username(username)
        Validation.password(password)

        const user = User.findOne({username})
        if (user) throw new Error('El usuario ya existe!')

        const id=crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()
        return id
    }

    static async login({username,password})
}


