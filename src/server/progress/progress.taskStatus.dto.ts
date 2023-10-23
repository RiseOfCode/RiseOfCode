import { TaskStatus } from '@prisma/client';

export class ProgressTaskStatusDto {
  constructor(name: string, status: TaskStatus) {
    this.name = name;
    this.status = status;
  }
  name: string;
  status: TaskStatus;
}
