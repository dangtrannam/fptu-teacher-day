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
    startDate?: Date,
    endDate?: Date,
  ): Promise<{
    data: any[],
    total: number,
    currentPage: number,
    totalPages: number,
  }> {
    let searchFilter: any = {};

    // Add text search conditions
    if (search?.trim()) {
      searchFilter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { schoolName: { $regex: search, $options: 'i' } },
        { userInput: { $regex: search, $options: 'i' } },
      ];
    }

    // Add timestamp range filter
    if (startDate || endDate) {
      searchFilter.timestamp = {};
      if (startDate) {
        searchFilter.timestamp.$gte = new Date(startDate);
      }
      if (endDate) {
        // Add one day to endDate to include the entire day
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        searchFilter.timestamp.$lt = adjustedEndDate;
      }
    }

    // Get total count and calculate pagination
    const total = await this.uploadModel.countDocuments(searchFilter);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const validatedPage = Math.max(1, Math.min(page, totalPages));
    const skip = (validatedPage - 1) * limit;

    // Get paginated and sorted documents
    const uploads = await this.uploadModel
      .find(searchFilter)
      .sort({ timestamp: -1 }) // Sort by timestamp descending
      .skip(skip)
      .limit(limit)
      .lean()
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
