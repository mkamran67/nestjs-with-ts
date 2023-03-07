import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

// This mock is taking over the TasksRepository
const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
  createTask: jest.fn(),
  deleteTaskById: jest.fn(),
  updateTaskStatus: jest.fn(),
});

const mockUser = {
  id: 'someid',
  username: 'test',
  password: 'test',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // initialize NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile(); // must compile

    tasksService = await module.get(TasksService);
    tasksRepository = await module.get(TasksRepository);
  });

  // You can nest describe blocks
  describe('getTasks', () => {
    it('calls the TasksRepository.getTasks and returns the result', () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      tasksRepository.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
    });
  });
});
