import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";

describe('TasksService', () => { 
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // initialize NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [TasksService],
    }) 
  })

 })