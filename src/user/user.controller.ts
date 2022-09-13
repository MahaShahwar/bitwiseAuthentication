import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { userDto } from './user.dto';
import { userService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { authGuard } from 'src/auth/local-auth.guard';
// import { AuthGuard } from '@nestjs/passport';
// import { authService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class userController {
    constructor( 
        private userService: userService,
        ){}
    
    //SignUp method call
    @UsePipes(new ValidationPipe())
    
    @Post('signUp')
    async newUser(
        @Body() user:userDto
        )
        {
         const hashedPass = await bcrypt.hash(user.password, 16)
         const added = await this.userService.signUp(
            user.name,
            user.email,
            hashedPass
        )
        return added
         }

    @UseGuards(JwtAuthGuard)

    @Get('allUsers')
        async allUsers(){
            const check= await this.userService.getUsers()
            return check
        }
}
