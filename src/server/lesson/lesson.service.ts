import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LessonReturnDto } from './lesson.return.dto';
import { LessonUpdateDto } from './lesson.update.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async addLesson(
    classId: string,
    name: string,
  ): Promise<LessonReturnDto> {
    return new LessonReturnDto(
      await this.prisma.lesson.create({
        data: {
          name: name,
          class_id: classId,
          theory: '',
        },
      }),
    );
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
    return new LessonReturnDto(
      await this.prisma.lesson.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }

  async findByClass(classId: string): Promise<LessonReturnDto[]> {
    const lessonsArr = await this.prisma.lesson.findMany({
      where: {
        class_id: classId,
      },
    });
    if (lessonsArr == null) throw new NotFoundException();
    const lessons: any[] = [];
    lessonsArr.forEach((ln) => {
      lessons[lessons.length] = new LessonReturnDto(ln);
    });
    return lessons;
  }

  async changeLesson(
    id: string,
    dto: LessonUpdateDto,
  ): Promise<LessonReturnDto> {
    return new LessonReturnDto(
      await this.prisma.lesson.update({
        where: {
          id,
        },
        data: dto,
      }),
    );
  }
}
