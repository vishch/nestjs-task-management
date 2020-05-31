import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { TaskStatuses } from '../models/task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!TaskStatuses.some(s => s === value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }
}
