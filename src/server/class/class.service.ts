import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClassReturnDto } from './dto/class.return.dto';
import { v4 as uuidv4 } from 'uuid';
import { ClassUpdateDto } from './dto/class.update.dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async addClass(teacherId: string, name: string): Promise<ClassReturnDto> {
    return new ClassReturnDto(
      await this.prisma.class.create({
        data: {
          name: name,
          teacher_id: teacherId,
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

  async findByTeacher(teacherId: string): Promise<ClassReturnDto[]> {
    const classesArr = await this.prisma.class.findMany({
      where: {
        teacher_id: teacherId,
      },
    });
    if (classesArr == null) throw new NotFoundException();
    const classes: any[] = [];
    classesArr.forEach((cl) => {
      classes[classes.length] = new ClassReturnDto(cl);
    });
    return classes;
  }

  async changeClass(id: string, dto: ClassUpdateDto): Promise<ClassReturnDto> {
    return new ClassReturnDto(
      await this.prisma.class.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          teacher_info: dto.teacherInfo,
          description: dto.description,
        },
      }),
    );
  }

  async addUserByCode(code: string, studentId: string) {
    const dbClass = await this.prisma.class.findFirst({
      where: {
        code: code,
      },
    });
    if (dbClass == null) throw new NotFoundException();
    await this.prisma.classStudent.create({
      data: {
        student_id: studentId,
        class_id: dbClass.id,
      },
    });
  }

  async addUserByNickname(nickname: string, classId: string) {
    const student = await this.prisma.user.findFirst({
      where: {
        nickname: nickname,
      },
    });
    if (student == null) throw new NotFoundException();
    await this.prisma.classStudent.create({
      data: {
        student_id: student.id,
        class_id: classId,
      },
    });
  }
}
