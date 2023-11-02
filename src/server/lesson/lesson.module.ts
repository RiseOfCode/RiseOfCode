import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService, PrismaService],
})
export class LessonModule {
  constructor(private lessonService: LessonService) {}
}
