import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesDto } from './roles.dto';
import { Roles } from './roles.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Roles') private readonly roleModel: Model<Roles>) {}
  async createRole(req: RolesDto) {
    const check = {
      stateUrl: req.stateUrl,
      bitwiseID: req.bitwiseID,
      endpoints: req.endpoint,
    };

    const newUser = await this.roleModel.create({
      name: req.name,
      permissions: check,
    });
    console.log(newUser);

    return newUser;
  }
}
