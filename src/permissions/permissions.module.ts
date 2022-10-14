import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { permissionsSchema } from './permissions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { userModule } from '@root/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Permissions', schema: permissionsSchema },
    ]), // 3. Setup the mongoose module to use the product schema
    // userModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [MongooseModule],
})
export class PermissionsModule {}
