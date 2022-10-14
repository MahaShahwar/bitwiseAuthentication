import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionsDto } from './permissions.dto';
import { Permissions } from './permissions.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel('Permissions')
    private readonly permissionsModel: Model<Permissions>,
  ) {}
  async createPermission(body: PermissionsDto) {
    const newUser = await this.permissionsModel.create({
      endpoint: body.endpoint,
      bitwiseId: body.bitwiseId,
    });
    return newUser;
  }
}
