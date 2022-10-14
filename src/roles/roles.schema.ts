import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Permissions } from '@root/permissions/permissions.schema';
import { Product } from '@root/product/product.schema';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Roles {
  @Prop()
  name: string;

  @Prop({
    type: [
      {
        stateUrl: { type: String },
        bitwiseID: { type: Number },
        endpoints: {
          type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
        },
      },
    ],
  })
  permissions: [
    { stateUrl: string; bitwiseID: number; endpoints: Permissions },
  ];
}

export const rolesSchema = SchemaFactory.createForClass(Roles);
