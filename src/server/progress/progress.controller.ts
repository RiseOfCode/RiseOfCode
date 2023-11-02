import { Controller, Get, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ApiTags } from '@nestjs/swagger';
import { ProgressLessonDto } from './progress.lesson.dto';
import { ProgressTaskDto } from './progress.task.dto';
@ApiTags('progress')
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get('/student')
  async findProgressForStudent(
    @Query('userId') userId: string,
    @Query('classId') classId: string,
  ): Promise<ProgressLessonDto[]> {
    return this.progressService.findProgressForStudent(userId, classId);
  }

  @Get('/teacher')
  async findProgressForTeacher(
    @Query('lessonId') lessonId: string,
  ): Promise<ProgressTaskDto[]> {
    return this.progressService.findProgressForTeacher(lessonId);
  }
}
