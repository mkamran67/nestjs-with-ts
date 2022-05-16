import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // TS Sugar - assigning an accessor keyword here "private" or "public" instiates the variable

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }
}
