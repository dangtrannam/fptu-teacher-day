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
      timestamp: new Date(),
    });
    return createdUpload.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 20,
    search: string = '',
  ): Promise<{
    data: any[],
    total: number,
    currentPage: number,
    totalPages: number,
  }> {
    //create a seach filter
    const searchFilter = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { schoolName: { $regex: search, $options: 'i' } },
        { userInput: { $regex: search, $options: 'i' } },
      ],
    } : {};

    // get total documents in the Upload collection
    const total = await this.uploadModel.countDocuments(searchFilter);

    // Get total pages
    const totalPages = Math.ceil(total / limit);

    // Ensure page doesn't exceed total pages
    const validatedPage = Math.max(1, Math.min(page, totalPages));

    // Calculate skip
    const skip = (validatedPage - 1) * limit;

    //get paginated documents
    const uploads = await this.uploadModel
      .find(searchFilter)
      .skip(skip)
      .limit(limit)
      .exec();

    const data = uploads.map(upload => ({
      _id: upload._id,
      name: upload.name,
      schoolName: upload.schoolName,
      userInput: upload.userInput,
      timestamp: upload.timestamp,
      imageUrl: upload.imagePath ? `${path.basename(upload.imagePath)}` : null,
      contentType: upload.contentType,
    }));

    return {
      data,
      total,
      currentPage: validatedPage,
      totalPages,
    };

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
