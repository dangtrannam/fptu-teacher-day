import { IsString } from 'class-validator';

export class CreateUploadDto {
  @IsString()
  readonly userInput: string;
}
