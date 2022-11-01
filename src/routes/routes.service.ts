import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { Routes } from '@root/routes/routes.schema';
import { RoutesEnum } from '@root/routes/enums/routes.enum';
@Injectable()
export class RoutesService {
  constructor(
    @InjectModel('Routes') private readonly routesModel: Model<Routes>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/explicit-module-boundary-types
  async route(router): Promise<string> {
    const routeArray: string[] = [];
    let i: number;
    for (i = 1; i < router.stack.length; i++) {
      if (router.stack[i].route) {
        routeArray.push(router.stack[i].route.path);
      }
    }

    routeArray.splice(routeArray.indexOf('/'), 1);

    try {
      for (i = 0; i < routeArray.length; i++) {
        //split and add forwardslash
        const path: string[] = routeArray[i].split(/(?=[/])/g);

        const p1: string = path[0];
        const p2: string = path.slice(1).join('');

        const exist: object = await this.routesModel.find({
          baseUrl: p1,
        });

        if (Object.keys(exist).length > 0) {
          const c: Routes[] = await this.routesModel.find({
            _id: exist[0]._id,
            'urls.url': p2,
          });

          if (c.length == 0) {
            await this.routesModel.findOneAndUpdate(
              { _id: exist[0]._id },
              {
                $push: {
                  urls: {
                    url: p2,
                  },
                },
              },
            );
          }
        } else {
          const base: string = p1;
          const url: string = p2;
          const u: [object] = [{ url }];
          await this.routesModel.create({ baseUrl: base, urls: u });
        }
      }
      return RoutesEnum.msg;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
