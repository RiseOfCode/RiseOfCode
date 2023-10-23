import { ProgressTaskAttemptsDto } from './progress.taskAttempts.dto';

export class ProgressTeacherDto {
  constructor(taskName: string, taskAttempts: ProgressTaskAttemptsDto[]) {
    this.taskName = taskName;
    this.taskAttempts = taskAttempts;
  }
  taskName: string;
  taskAttempts: ProgressTaskAttemptsDto[];
}
