import { ProgressTaskDto } from './progress.task.dto';

export class ProgressLessonDto {
  constructor(
    name: string,
    solvedTasksAmount: number,
    tasks: ProgressTaskDto[],
  ) {
    this.name = name;
    this.solvedTasksAmount = solvedTasksAmount;
    this.tasks = tasks;
  }
  name: string;
  solvedTasksAmount: number;
  tasks: ProgressTaskDto[];
}
