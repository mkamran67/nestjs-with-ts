import {
  ImATeapotException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, Task as TaskEntity } from './task.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        new Brackets((queryBuilder) => {
          queryBuilder.where(
            'title ILIKE :search OR description ILIKE :search',
            {
              search: `%${search}%`,
            },
          );
        }),
      );
    }

    // if (search) {
    //   query.andWhere(
    //     'task.title LIKE :search or task.description LIKE :search',
    //     { search: `%${search}%` },
    //   );
    // }

    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskByID(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID : ${id} was not found.`);
    } else {
      return found;
    }
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    const result = await this.tasksRepository.save(task);

    if (result) {
      return result;
    } else {
      throw new ImATeapotException();
    }
  }

  async deleteTaskByID(ID: string): Promise<void> {
    const result = await this.tasksRepository.delete(ID);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${ID}" not found.`);
    }
  }

  async updateTaskStatusByID(
    ID: string,
    taskStatus: TaskStatus,
  ): Promise<Task> {
    const task = await this.getTaskByID(ID);

    task.status = taskStatus;

    await this.tasksRepository.save(task);

    return task;
  }
}
