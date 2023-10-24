import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LessonReturnDto } from './lesson.return.dto';
import { LessonService } from './lesson.service';
import { LessonUpdateDto } from './lesson.update.dto';
@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post(':classId')
  async addClass(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Query('name') name: string,
    @Query('theory') theory: string,
  ): Promise<LessonReturnDto> {
    return this.lessonService.addLesson(classId, name, theory);
  }

  @Get(':lessonId')
  async findClass(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<LessonReturnDto> {
    return this.lessonService.findLesson(lessonId);
  }

  @Get('/class/:classId')
  async findByClass(
    @Param('classId', ParseUUIDPipe) classId: string,
  ): Promise<LessonReturnDto[]> {
    return this.lessonService.findByClass(classId);
  }

  @Delete(':lessonId')
  async deleteLesson(@Param('lessonId', ParseUUIDPipe) lessonId: string) {
    await this.lessonService.deleteLesson(lessonId);
  }

  @Put(':lessonId')
  async changeLesson(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
    @Body() Lesson: LessonUpdateDto,
  ): Promise<LessonReturnDto> {
    return this.lessonService.changeLesson(lessonId, Lesson);
  }
}
