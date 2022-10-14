import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  //Adding into database
  async addProduct(
    name: string,
    description: string,
    price: number,
    category: string,
  ) {
    const newProduct = await this.productModel.create({
      name,
      description,
      price,
      category,
    });
    return newProduct;
  }

  async getProducts(): Promise<any> {
    const allProducts = await this.productModel.find().exec();
    return allProducts;
  }
}
