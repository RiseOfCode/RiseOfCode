import { Task, Theme } from '@prisma/client';
import { TaskTestDto } from './task.test.dto';
import { TaskBaseReturnDto } from './task.base.return.dto';
import { TaskAttemptDto } from './task.attempt.dto';
import { TeacherTaskReturnDto } from './teacher.task.return.dto';
export class StudentTaskReturnDto extends TeacherTaskReturnDto {
  constructor(
    task: Task,
    themes: Theme[] | null,
    rating: number,
    tests: TaskTestDto[] | null,
    attempts: TaskAttemptDto[] | null,
    finalAttempt: TaskAttemptDto | null,
  ) {
    super(task, themes, 0, rating, tests);
    this.attempts = attempts;
    this.finalAttempt = finalAttempt;
  }
  attempts: TaskAttemptDto[] | null;
  finalAttempt: TaskAttemptDto | null;
}
