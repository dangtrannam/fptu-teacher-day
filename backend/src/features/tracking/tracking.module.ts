import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracking, TrackingSchema } from './entities/tracking.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tracking.name, schema: TrackingSchema }])],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
