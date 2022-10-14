import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from '@User/user.model';
import { Role } from '@root/auth/enums/role.enum';
import { Roles } from '@root/roles/roles.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class userService {
  constructor(@InjectModel('user') private readonly userModel: Model<user>) {}

  //Adding into database
  async signUp(name: string, email: string, password: string, role: Roles) {
    const checkEmail = await this.userModel.findOne({ email: email });
    if (checkEmail) {
      return 'Email already existed';
    } else {
      const newUser = await this.userModel.create({
        name,
        email,
        password,
        role,
      });
      return newUser;
    }
  }

  //Login

  async getEntity(email: string) {
    const getUser = await this.userModel.findOne({ email: email });
    return getUser;
  }

  //Get all Users
  async getUsers(): Promise<any> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }

  //Update user
  async updateUser(email: string, role: Roles): Promise<any> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email: email },
      { role: role },
      { new: true },
    );
    return updatedUser;
  }

  //Delete user,pass email from the body
  async deleteUser(email: string): Promise<any> {
    await this.userModel.deleteOne({ email: email });
    return 'deleted user';
  }
}
