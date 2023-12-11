import { Theme } from '@prisma/client';
import { TaskTestDto } from './task.test.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskCreateDto {
  constructor() {
    this.name = '';
    this.themes = new Array<Theme>();
    this.description = '';
    this.tests = new Array<TaskTestDto>();
  }

  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  themes: Theme[];
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  tests: TaskTestDto[];
}
