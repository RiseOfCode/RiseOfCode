import { ApiProperty } from "@nestjs/swagger";

export class LessonUpdateDto {
  constructor() {
    this.name = '';
    this.theory = '';
  }
  @ApiProperty({ example: 'Lesson name' })
  name: string;
  @ApiProperty({ example: 'Lesson theory' })
  theory: string;
}
