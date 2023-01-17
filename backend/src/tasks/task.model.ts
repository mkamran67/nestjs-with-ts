export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Enums force a specific set of string values
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
