import { Body, ConsoleLogger, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { userDto } from '@User/user.dto';
import { userService } from '@User/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';
import { RolesGuard } from '@Auth/guards/roles.guard';
import { Roles } from '@Auth/decorator/roles.decorator';
import { Role } from '@Auth/enums/role.enum';

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
            hashedPass,
            user.roles
        )
        return added
         }
    @Roles(Role.User)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('allUsers')
        async allUsers(){
            //console.log(user)
            const check= await this.userService.getUsers()
            return check
        }
}
