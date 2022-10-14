import { Product } from '@root/product/product.schema';
import { IsEmail, Length } from 'class-validator';

//Define how the data pass or get from client side and use it
export class PermissionsDto {
  endpoint: string;
  bitwiseId: number;
}
