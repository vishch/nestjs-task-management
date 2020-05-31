import { Task } from '../models/task';
import { TaskDto } from './task.dto';

export class TaskMapper {
  static toDto(task: Task): TaskDto {
    return { ...task };
  }

  static toDtos(tasks: Task[]): TaskDto[] {
    return [...tasks];
  }
}
