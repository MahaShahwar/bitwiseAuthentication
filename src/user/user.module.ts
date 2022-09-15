import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userController } from '@User/user.controller';
import { userSchema } from '@User/user.model';
import { userService } from '@User/user.service';
import { AuthModule } from '@Auth/auth.module';

@Module({
    imports:[AuthModule,MongooseModule.forFeature([{ name: 'user', schema: userSchema}])],
    controllers:[userController],
    providers:[userService],
    exports:[userService]
})
export class userModule {
}
