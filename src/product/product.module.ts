import { Module } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { ProductController } from 'src/product/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/product.schema';
import { userService } from '@root/user/user.service';
import { userModule } from '@root/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // 3. Setup the mongoose module to use the product schema
    userModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
