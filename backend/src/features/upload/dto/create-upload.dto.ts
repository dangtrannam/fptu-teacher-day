import { IsString } from 'class-validator';

export class CreateUploadDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly schoolName: string;
  @IsString()
  readonly userInput: string;
}
