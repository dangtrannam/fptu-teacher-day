import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Tracking extends Document {
  @Prop()
  userIp: string;

  @Prop()
  type: string;

  @Prop()
  timestamp: Date;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);