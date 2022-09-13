import * as mongoose from 'mongoose'

//Schema define in db
export const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

//Type Checking
export interface user {
    id:number,
    name:string,
    email:string,
    password:string
}