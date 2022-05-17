import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './DTO/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} // TS Sugar - assigning an accessor keyword here "private" or "public" instiates the variable

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDto).length) {
      if (filterDto.status) {
      }
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id') ID: string): void {
    return this.tasksService.deleteTaskByID(ID);
  }

  @Patch('/:id/status')
  updateTaskByID(
    @Param('id') ID: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTO;

    return this.tasksService.updateTaskStatusByID(ID, status);
  }

  @Get('/:id')
  getTaskByID(@Param('id') ID: string): Task {
    return this.tasksService.getTaskByID(ID);
  }
}
