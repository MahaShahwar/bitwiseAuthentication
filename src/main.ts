import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '@root/app.module';
import * as expressListRoutes from 'express-list-routes';
import('module-alias/register');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.Port);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  // console.log(typeof router);
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      if (r.route.path.startsWith('/users')) {
        console.log(r.route.path);
      }
    }
  });

  //all endpoints of app
  console.log(expressListRoutes(router));
}
bootstrap();
