import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LessonReturnDto } from './dto/lesson.return.dto';
import { LessonUpdateDto } from './dto/lesson.update.dto';
import { asWindowsPath } from '@angular-devkit/core';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async addLesson(classId: string): Promise<LessonReturnDto> {
    const classInfo = await this.prisma.class.findUnique({
      where: { id: classId },
    });
    if (!classInfo) {
      throw new Error(`Class with id ${classId} not found`);
    }
    const lesson = await this.prisma.lesson.create({
      data: {
        name: 'Новый урок',
        class_id: classId,
        theory: '',
      },
    });
    return new LessonReturnDto(lesson, classInfo);
  }

  async deleteLesson(id: string) {
    await this.prisma.lessonTask.deleteMany({
      where: {
        lesson_id: id,
      },
    });

    await this.prisma.lesson.delete({
      where: {
        id,
      },
    });
  }

  async findLesson(id: string): Promise<LessonReturnDto> {
    const lesson = await this.prisma.lesson.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const classInfo = await this.prisma.class.findUnique({
      where: {
        id: lesson.class_id,
      },
    });
    if (!classInfo) {
      throw new Error(`Class with id ${lesson.class_id} not found`);
    }
    return new LessonReturnDto(lesson, classInfo);
  }

  async findByClass(classId: string): Promise<LessonReturnDto[]> {
    const lessonsArr = await this.prisma.lesson.findMany({
      where: {
        class_id: classId,
      },
    });

    if (lessonsArr.length === 0) {
      throw new NotFoundException();
    }

    const lessons: LessonReturnDto[] = [];

    for (const ln of lessonsArr) {
      const classInfo = await this.prisma.class.findUnique({
        where: {
          id: ln.class_id,
        },
      });

      if (!classInfo) {
        throw new Error(`Class with id ${ln.class_id} not found`);
      }

      lessons.push(new LessonReturnDto(ln, classInfo));
    }

    return lessons;
  }

  async changeLesson(
    id: string,
    dto: LessonUpdateDto,
  ): Promise<LessonReturnDto> {
    const lesson = await this.prisma.lesson.update({
      where: {
        id,
      },
      data: dto,
    });
    const classInfo = await this.prisma.class.findUnique({
      where: {
        id: lesson.class_id,
      },
    });
    if (!classInfo) {
      throw new Error(`Class with id ${lesson.class_id} not found`);
    }
    return new LessonReturnDto(lesson, classInfo);
  }
}
