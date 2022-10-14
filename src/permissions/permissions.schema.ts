import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Permissions {
  @Prop({ type: String })
  endpoint: string;

  @Prop({ type: Number })
  bitwiseId: number;
}

export const permissionsSchema = SchemaFactory.createForClass(Permissions);
