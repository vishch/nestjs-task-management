import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskMapper } from './dto/task.mapper';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './models/task';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getById(@Param('id') id: string): TaskDto {
    const task = this.tasksService.getById(id);
    const dto = TaskMapper.toDto(task);

    return dto;
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): TaskDto[] {
    let tasks: Task[] = [];

    if (filterTaskDto) {
      tasks = this.tasksService.getFilteredTasks(filterTaskDto);
    } else {
      tasks = this.tasksService.getTasks();
    }

    const dtos = TaskMapper.toDtos(tasks);

    return dtos;
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto): TaskDto {
    const task = this.tasksService.create(createTaskDto);
    const dto = TaskMapper.toDto(task);

    return dto;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): TaskDto {
    const task = this.tasksService.update(id, updateTaskDto);
    const dto = TaskMapper.toDto(task);

    return dto;
  }
}
