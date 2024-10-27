import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Upload } from './entities/upload.entity';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {

  constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) {
  }

  async create(createUploadDto: CreateUploadDto, file: Express.Multer.File): Promise<Upload> {
    const createdUpload = new this.uploadModel({
      ...createUploadDto,
      imagePath: file.filename,
      contentType: file.mimetype,
    });
    return createdUpload.save();
  }

  async findAll(): Promise<any[]> {
    const uploads = await this.uploadModel.find().exec();
    return uploads.map(upload => ({
      _id: upload._id,
      userInput: upload.userInput,
      imageUrl: `${path.basename(upload.imagePath)}`,
      contentType: upload.contentType,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
