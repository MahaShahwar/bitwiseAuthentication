import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModule } from '@root/user/user.module';
import { rolesSchema } from './roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Roles', schema: rolesSchema }]), // 3. Setup the mongoose module to use the product schema
    // userModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [MongooseModule],
})
export class RolesModule {}
