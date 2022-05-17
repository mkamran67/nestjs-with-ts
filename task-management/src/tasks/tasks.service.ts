import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first dummy task',
      description: 'first description',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    const found = this.tasks.find((element) => {
      if (element.id === id) {
        return true;
      }
    });

    if (found) {
      return found;
    } else {
      throw new NotFoundException();
    }
  }

  deleteTaskByID(ID: string) {
    const found = this.getTaskByID(ID);

    this.tasks = this.tasks.filter((task) => task.id !== ID);
    return;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatusByID(ID: string, status: TaskStatus): Task {
    const index = this.tasks.findIndex((task) => task.id === ID);

    this.tasks[index].status = status ? status : this.tasks[index].status;

    return this.tasks[index];
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;

    // Define a temp array to hold result;

    let tasks = this.getAllTasks();

    // Do somewith with Status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // Do something with Search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }
}
