import { IsEmail, Length } from "class-validator"

//Define how the data pass or get from client side and use it
export class userDto{

    name:string

    @IsEmail()
    email:string

    @Length(5)
    password:string
}