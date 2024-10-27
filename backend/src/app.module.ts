import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './features/upload/upload.module';
import { TrackingModule } from './features/tracking/tracking.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/teacherday_app'),
    MulterModule.register({
      dest: './files',
    }),
    UploadModule,
    TrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
