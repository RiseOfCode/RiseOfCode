import { Task } from '@prisma/client';

export class TaskBaseReturnDto {
  constructor(task: Task, rating: number) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.rating = rating;
  }
  id: string;
  name: string;
  description: string;
  rating: number;
}
