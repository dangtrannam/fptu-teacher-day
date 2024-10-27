import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('access')
  trackAccess(@Req() request: Request, @Body() createTrackingDto: CreateTrackingDto) {
    const userIp = request.headers['x-forwarded-for'];
    const timestamp = new Date();
    if (!userIp) {
      throw new BadRequestException('User IP is required');
    }
    return this.trackingService.trackAccess({ ...createTrackingDto, userIp, timestamp });
  }

  @Get('access')
  @UseGuards(AuthGuard('jwt'))
  getAccessTracking() {
    return this.trackingService.getAccessTracking();
  }

  @Post('share')
  trackShare(@Req() request: Request, @Body() createTrackingDto: CreateTrackingDto) {
    const userIp = request.headers['x-forwarded-for']
    const timestamp = new Date();
    if (!userIp) {
      throw new BadRequestException('User IP is required');
    }
    return this.trackingService.trackShare({ ...createTrackingDto, userIp, timestamp });
  }

  @Get('share')
  @UseGuards(AuthGuard('jwt'))
  getShareTracking() {
    return this.trackingService.getShareTracking();
  }

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.trackingService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(+id, updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(+id);
  }
}
