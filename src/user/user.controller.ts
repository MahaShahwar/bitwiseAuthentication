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

@Controller('users')
export class userController {
  constructor(private userService: userService) {}

  //SignUp method call
  @UsePipes(new ValidationPipe())
  @Post('signUp')
  async newUser(@Body() user: userDto) {
    const hashedPass = await bcrypt.hash(user.password, 16);
    // const binary = user.role.toString(2);
    // console.log(binary);
    const added = await this.userService.signUp(
      user.name,
      user.email,
      hashedPass,
      user.role,
    );
    return added;
  }

  @Get('allUsers')
  async allUsers() {
    const check = await this.userService.getUsers();
    return check;
  }

  @Put('update')
  async updateUser(@Body() user: userDto) {
    const updated = await this.userService.updateUser(user.email, user.role);
    return updated;
  }

  @Delete('delete')
  async deleteUser(@Body() user: userDto) {
    return await this.userService.deleteUser(user.email);
  }
}
