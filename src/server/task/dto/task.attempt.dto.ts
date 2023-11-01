import { SolvingAttempt, TaskStatus } from '@prisma/client';

export class TaskAttemptDto {
  constructor(attempt: SolvingAttempt) {
    this.date = attempt.date;
    this.status = attempt.task_status;
    this.comment = attempt.comment;
  }

  date: Date;
  status: TaskStatus;
  comment: string;
}
