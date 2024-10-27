import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tracking } from './entities/tracking.entity';

@Injectable()
export class TrackingService {
  constructor(@InjectModel(Tracking.name) private trackingModel: Model<Tracking>) {}

  async trackAccess(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingTracking = await this.trackingModel.findOne({
      userIp: createTrackingDto.userIp,
      type: 'access',
      timestamp: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingTracking) {
      console.log('Existing tracking:', existingTracking);
      
      return existingTracking;
    }

    const createdTracking = new this.trackingModel({ ...createTrackingDto, type: 'access' });
    return createdTracking.save();
  }

  async getAccessTracking(): Promise<Tracking[]> {
    return this.trackingModel.find({ type: 'access' }).exec();
  }

  async trackShare(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingTracking = await this.trackingModel.findOne({
      userIp: createTrackingDto.userIp,
      type: 'share',
      timestamp: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingTracking) {
      console.log('Existing tracking:', existingTracking);
      
      return existingTracking;
    }

    const createdTracking = new this.trackingModel({ ...createTrackingDto, type: 'share' });
    return createdTracking.save();
  }

  async getShareTracking(): Promise<Tracking[]> {
    return this.trackingModel.find({ type: 'share' }).exec();
  }
  
  create(createTrackingDto: CreateTrackingDto) {
    return 'This action adds a new tracking';
  }

  findAll() {
    return this.trackingModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} tracking`;
  }

  update(id: number, updateTrackingDto: UpdateTrackingDto) {
    return `This action updates a #${id} tracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
