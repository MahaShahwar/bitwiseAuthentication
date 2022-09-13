import { Module } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { ProductController } from 'src/product/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]) // 3. Setup the mongoose module to use the product schema
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
