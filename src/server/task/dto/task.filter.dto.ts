import { Theme } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskFilterDto {
  constructor() {
    this.themes = new Array<Theme>();
    this.minRating = 0;
    this.isDesc = true;
  }
  @IsNotEmpty()
  themes: Theme[] | null;
  @IsNotEmpty()
  @IsNumber()
  minRating: number;
  @IsNotEmpty()
  isDesc: boolean;
}
