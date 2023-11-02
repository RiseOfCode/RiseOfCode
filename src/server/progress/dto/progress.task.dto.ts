import { ProgressTaskAttemptsDto } from './progress.task.attempts.dto';

export class ProgressTaskDto {
  constructor(name: string, attempts: ProgressTaskAttemptsDto[]) {
    this.name = name;
    this.attempts = attempts;
  }
  name: string;
  attempts: ProgressTaskAttemptsDto[];
}
