import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './models/task';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './models/task-status.enum';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task not found for id ${id}`);
    }

    return task;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filterTaskDto: FilterTaskDto): Task[] {
    let tasks = this.tasks;

    if (filterTaskDto.status) {
      tasks = tasks.filter(t => t.status === filterTaskDto.status);
    }

    if (filterTaskDto.search) {
      const contains = (field: string) =>
        field.includes(filterTaskDto.search as string);
      tasks = tasks.filter(t => contains(t.description) || contains(t.title));
    }

    return tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      ...createTaskDto,
      id: uuidv4(),
      status: TaskStatus.Open,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  remove(id: string): void {
    this.getById(id);

    const updatedTasks = this.tasks.filter(t => t.id !== id);
    this.tasks = updatedTasks;
  }

  update(id: string, updateDto: UpdateTaskDto): Task {
    const task = this.getById(id);
    task.status = updateDto.status;

    return task;
  }
}
