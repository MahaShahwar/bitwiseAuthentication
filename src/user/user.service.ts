import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from '@User/user.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class userService {
  constructor(@InjectModel('user') private readonly userModel: Model<user>) {}

  //Adding into database
  async signUp(name: string, email: string, password: string, roles: []) {
    const checkEmail = await this.userModel.findOne({ email: email });
    if (checkEmail) {
      return 'Email already existed';
    } else {
      const newUser = await this.userModel.create({
        name,
        email,
        password,
        roles,
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
  async updateUser(email: string, roles: []): Promise<any> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email: email },
      { roles: roles },
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
