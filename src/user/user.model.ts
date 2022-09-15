import { Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Role } from 'src/auth/enums/role.enum'


//Schema define in db
export const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    roles: {type:String,enum:Role}
})

//Type Checking
export interface user {
    id:number,
    name:string,
    email:string,
    password:string,
    roles: Role[]
}

