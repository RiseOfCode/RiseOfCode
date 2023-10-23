import { TaskStatus } from '@prisma/client';

export class ProgressTaskDto {
  constructor(name: string, status: TaskStatus) {
    this.name = name;
    this.status = status;
  }
  name: string;
  status: TaskStatus;
}
