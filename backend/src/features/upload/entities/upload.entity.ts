import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Upload extends Document {
  @Prop()
  imagePath: string;

  @Prop()
  contentType: string;

  @Prop()
  userInput: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);