import { Test } from '@prisma/client';

export class TaskTestDto {
  constructor(test: Test) {
    this.input = test.input;
    this.output = test.output;
  }

  input: string;
  output: string;
}
