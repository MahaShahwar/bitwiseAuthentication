import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model, Connection } from 'mongoose';
import { user, userSchema } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '@root/roles/roles.schema';
import { Permissions } from '@root/permissions/permissions.schema';

type PayloadType = {
  email: string;
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('user') private readonly userModel: Model<user>,
    @InjectModel('Roles') private readonly rolesModel: Model<Roles>,
    @InjectModel('Permissions')
    private readonly permissionsModel: Model<Permissions>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //User id from jwt
    const decodedJwt = this.jwtService.decode(
      req.header('authorization').split(' ')[1],
    ) as PayloadType;

    //User from db
    const userData = await this.userModel
      .findOne({ email: decodedJwt.email })
      .populate('role', ' ', this.rolesModel);

    //EndPoints from db
    const endpoints = await this.permissionsModel.find();

    let url;
    let bits;
    //Getting the required url

    //loop for multiple roles and permissions
    for (let i = 0; i < Object.keys(userData.role).length; i++) {
      for (
        let j = 0;
        j < Object.keys(userData.role[i].permissions).length;
        j++
      ) {
        url = userData.role[i].permissions[j].stateUrl;
        if (url == req.baseUrl) {
          bits = userData.role[i].permissions[j].bitwiseID;
          break;
        }
      }
    }
    if (url == undefined) {
      return res.send(
        `Your Are Not Authorized to Access this Resource ${req.url}`,
      );
    } else {
      const api = endpoints.find((o) => o.endpoint === req.url);
      if (bits & api.bitwiseId) {
        next();
      } else {
        return res.send(
          `Your Are Not Authorized to Access this Resource ${req.url}`,
        );
      }
    }
  }
}
