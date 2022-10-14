import { Permissions } from '@root/permissions/permissions.schema';
import { Product } from '@root/product/product.schema';
import { IsEmail, Length } from 'class-validator';

//Define how the data pass or get from client side and use it
export class RolesDto {
  name: string;

  // roles: number;
  stateUrl: string;
  bitwiseID: number;
  endpoint: Permissions;
}
