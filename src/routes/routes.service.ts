import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Routes } from './routes.schema';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel('Routes') private readonly routesModel: Model<Routes>,
  ) {}
  async route(router): Promise<any> {
    const routeArray = [];
    for (let i = 1; i < router.stack.length; i++) {
      if (router.stack[i].route) {
        routeArray.push(router.stack[i].route.path);
      }
    }

    routeArray.splice(routeArray.indexOf('/'), 1);

    for (let i = 0; i < routeArray.length; i++) {
      const path = routeArray[i].split('/');
      const exist = await this.routesModel.find({
        baseUrl: path[1],
      });
      if (exist.length > 0) {
        const c = await this.routesModel.find({
          'urls.url': path[2],
        });
        console.log(c);

        if (c) {
          console.log('nothing');
        } else {
          await this.routesModel
            .findOneAndUpdate(
              { _id: exist[0]._id },
              {
                $push: {
                  urls: {
                    url: path[2],
                  },
                },
              },
            )
            .catch(function (err) {
              console.log(err);
            });
        }
      } else {
        const base = path[1];
        const url = path[2];
        const u = [{ url }];
        await this.routesModel.create({ baseUrl: base, urls: u });
      }
    }
  }
}
