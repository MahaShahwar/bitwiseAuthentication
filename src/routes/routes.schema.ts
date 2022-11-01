import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Routes {
  // @Prop({
  //   type: [
  //     {
  //       baseUrl: { type: String },
  //       urls: [{ url: { type: String } }],
  //     },
  //   ],
  // })
  // routes: { baseUrl: string; urls: [{ url }] };

  @Prop({ type: String })
  baseUrl: string;

  @Prop({ type: Object })
  urls: object[];
}

export const routesSchema = SchemaFactory.createForClass(Routes);
