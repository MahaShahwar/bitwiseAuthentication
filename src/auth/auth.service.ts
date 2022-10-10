import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userService } from '@User/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class authService {
  constructor(private userService: userService, private jwt: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getEntity(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    //This payload user coming from localAuthGuard return
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
    const access_token = this.jwt.sign(payload);
    return { access_token };
  }
}
