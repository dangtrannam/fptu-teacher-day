import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Upload extends Document {
  @Prop()
  imagePath: string;

  @Prop()
  contentType: string;

  @Prop()
  name: string;

  @Prop()
  schoolName: string;

  @Prop()
  userInput: string;

  @Prop()
  timestamp: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
