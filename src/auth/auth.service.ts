import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class authService {
    constructor(private userService:userService,
        private jwt:JwtService
        ){}

    async validateUser(email:string, password:string):Promise<any>{
        const user = await this.userService.getEntity(email)
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if(user && isMatch){
            return user
        }
        return null
    }

    async login(email:string):Promise<any>{
        const payload = { email: email};
    return {
      access_token: this.jwt.sign(payload),
    };
    }
}
