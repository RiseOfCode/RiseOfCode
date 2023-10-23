import { ProgressTaskStatusDto } from './progress.taskStatus.dto';

export class ProgressLessonDto {
  constructor(
    name: string,
    solvedTasksAmount: number,
    tasks: ProgressTaskStatusDto[],
  ) {
    this.name = name;
    this.solvedTasksAmount = solvedTasksAmount;
    this.tasks = tasks;
  }
  name: string;
  solvedTasksAmount: number;
  tasks: ProgressTaskStatusDto[];
}
