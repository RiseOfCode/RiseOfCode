import { Task, Theme } from '@prisma/client';
import { TaskTestDto } from './task.test.dto';
import { TaskBaseReturnDto } from './task.base.return.dto';
export class TeacherTaskReturnDto extends TaskBaseReturnDto {
  constructor(
    task: Task,
    themes: Theme[] | null,
    rating: number,
    tests: TaskTestDto[] | null,
  ) {
    super(task, rating);
    this.themes = themes;
    this.tests = tests;
    this.checker = task.checker;
  }
  themes: Theme[] | null;
  tests: TaskTestDto[] | null;
  checker: string;
}
