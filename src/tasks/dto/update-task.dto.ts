import { TaskStatus, TaskStatuses } from '../models/task-status.enum';
import { IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsIn(TaskStatuses)
  status: TaskStatus;
}
