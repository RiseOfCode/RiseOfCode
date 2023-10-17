import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClassReturnDto } from './class.returnDto';
import { v4 as uuidv4 } from 'uuid';
import { ClassCreateDto } from './class.createDto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async addClass(teacher_id: string, name: string): Promise<ClassReturnDto> {
    return new ClassReturnDto(
      await this.prisma.class.create({
        data: {
          name: name,
          teacher_id: teacher_id,
          code: uuidv4(),
          teacher_info: '',
          description: '',
        },
      }),
    );
  }

  async deleteClass(id: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        class_id: id,
      },
    });

    for (const lesson of lessons) {
      await this.prisma.lessonTask.deleteMany({
        where: {
          lesson_id: lesson.id,
        },
      });
    }

    await this.prisma.lesson.deleteMany({
      where: {
        class_id: id,
      },
    });

    await this.prisma.classStudent.deleteMany({
      where: {
        class_id: id,
      },
    });

    await this.prisma.class.delete({
      where: {
        id,
      },
    });
  }

  async findClass(id: string): Promise<ClassReturnDto> {
    return new ClassReturnDto(
      await this.prisma.class.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }

  async findAll(teacher_id: string): Promise<ClassReturnDto[]> {
    const classes_arr = await this.prisma.class.findMany({
      where: {
        teacher_id: teacher_id,
      },
    });
    if (classes_arr == null) throw new NotFoundException();
    const classes: any[] = [];
    classes_arr.forEach((cl) => {
      classes[classes.length] = new ClassReturnDto(cl);
    });
    return classes;
  }

  async changeClass(
    id: string,
    the_class: ClassCreateDto,
  ): Promise<ClassReturnDto> {
    return new ClassReturnDto(
      await this.prisma.class.update({
        where: {
          id,
        },
        data: {
          name: the_class.name,
          teacher_info: the_class.teacher_info,
          description: the_class.description,
        },
      }),
    );
  }

  async addUserByCode(code: string, student_id: string) {
    const the_class = await this.prisma.class.findFirst({
      where: {
        code: code,
      },
    });
    if (the_class == null) throw new NotFoundException();
    await this.prisma.classStudent.create({
      data: {
        student_id: student_id,
        class_id: the_class.id,
      },
    });
  }

  async addUserByNickname(nickname: string, class_id: string) {
    const student = await this.prisma.user.findFirst({
      where: {
        nickname: nickname,
      },
    });
    if (student == null) throw new NotFoundException();
    await this.prisma.classStudent.create({
      data: {
        student_id: student.id,
        class_id: class_id,
      },
    });
  }
}
