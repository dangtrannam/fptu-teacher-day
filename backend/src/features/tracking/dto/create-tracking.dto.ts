export class CreateTrackingDto {
    readonly userIp: string;
    readonly timestamp: Date = new Date();
  }