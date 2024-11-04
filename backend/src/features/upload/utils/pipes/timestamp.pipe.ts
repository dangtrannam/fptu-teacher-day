// pipes/timestamp.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseTimestampPipe implements PipeTransform {
    transform(value: string): Date | undefined {
        if (!value) return undefined;

        let date: Date;

        // Try parsing as Unix timestamp
        const timestamp = parseInt(value);
        if (!isNaN(timestamp)) {
            date = new Date(timestamp * 1000);
        } else {
            // Try parsing as date string
            date = new Date(value);
        }

        // Validate date
        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid timestamp or date format');
        }

        // Strip time components - set to start of day (00:00:00)
        date.setHours(0, 0, 0, 0);

        return date;
    }
}