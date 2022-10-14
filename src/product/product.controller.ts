import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { userDto } from '@User/user.dto';
import { userService } from '@User/user.service';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private userService: userService,
    private productService: ProductService,
  ) {}

  @Post('addProduct')
  async newUser(@Body() product: CreateProductDTO) {
    const added = await this.productService.addProduct(
      product.name,
      product.description,
      product.price,
      product.category,
    );
    return added;
  }

  @Get('allProducts')
  async allProducts() {
    const check = await this.productService.getProducts();
    return check;
  }
}
