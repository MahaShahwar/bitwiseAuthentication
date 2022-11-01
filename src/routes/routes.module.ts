import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { routesSchema } from './routes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Routes', schema: routesSchema }]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
