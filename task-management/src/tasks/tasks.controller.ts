import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './DTO/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard()) // Protect an entire route
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {} // TS Sugar - assigning an accessor keyword here "private" or "public" instiates the variable

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskByID(id, user);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters : ${JSON.stringify(
        filterDto,
      )} `,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`${user.username} created ${createTaskDTO.title}`);
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id') ID: string, @GetUser() user: User) {
    return this.tasksService.deleteTaskByID(ID, user);
  }

  @Patch('/:id/status')
  updateTaskByID(
    @Param('id') ID: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    const { taskStatus } = updateTaskStatusDTO;

    return this.tasksService.updateTaskStatusByID(ID, taskStatus, user);
  }
}
