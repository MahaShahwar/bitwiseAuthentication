/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { userDto } from '@User/user.dto';
import { userService } from '@User/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';
import { RolesGuard } from '@Auth/guards/roles.guard';
// import { Roles } from '@Auth/decorator/roles.decorator';
// import { Role } from '@Auth/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class userController {
  constructor(private userService: userService) {}

  //SignUp method call
  @UsePipes(new ValidationPipe())
  @Post('signUp')
  async newUser(@Body() user: userDto) {
    const hashedPass = await bcrypt.hash(user.password, 16);
    const added = await this.userService.signUp(
      user.name,
      user.email,
      hashedPass,
      user.roles,
    );
    return added;
  }
  //Get all users
  //   @Roles(Role.User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allUsers')
  async allUsers() {
    const check = await this.userService.getUsers();
    console.log(check);

    return check;
  }

  //Update into db
  //   @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update')
  async updateUser(@Body() user: userDto) {
    const updated = await this.userService.updateUser(user.email, user.roles);
    return updated;
  }

  //Delete from db
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete')
  async deleteUser(@Body() user: userDto) {
    return await this.userService.deleteUser(user.email);
  }
}
