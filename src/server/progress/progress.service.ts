import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProgressLessonDto } from './dto/progress.lesson.dto';
import { ProgressTaskStatusDto } from './dto/progress.task.status.dto';
import { ProgressTaskDto } from './dto/progress.task.dto';
import { ProgressTaskAttemptsDto } from './dto/progress.task.attempts.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async findProgressForStudent(
    userId: string,
    classId: string,
  ): Promise<ProgressLessonDto[]> {
    const lessonsArr = await this.prisma.lesson.findMany({
      where: {
        class_id: classId,
      },
      include: {
        tasks: true,
      },
    });

    const lessons: any[] = [];

    for (const lesson of lessonsArr) {
      const lessonName = lesson.name;
      const tasks: any[] = [];
      let solvedTaskAmount = 0;

      for (const task of lesson.tasks) {
        const taskInfo = await this.prisma.task.findUniqueOrThrow({
          where: {
            id: task.task_id,
          },
          include: {
            solving: {
              where: {
                user_id: userId,
              },
              include: {
                solving_attempts: {
                  orderBy: {
                    date: 'desc',
                  },
                },
              },
            },
          },
        });

        const taskName = taskInfo.name;
        let finalTaskStatus = 'NOT_STARTED';
        if (taskInfo.solving[0] != null) {
          finalTaskStatus = taskInfo.solving[0].solving_attempts[0].task_status;
          if (
            taskInfo.solving[0].solving_attempts.some(
              (attempt) => attempt.task_status == 'SOLVED',
            )
          ) {
            finalTaskStatus = 'SOLVED';
            solvedTaskAmount++;
          }
        }

        tasks[tasks.length] = new ProgressTaskStatusDto(
          taskName,
          finalTaskStatus,
        );
      }

      lessons[lessons.length] = new ProgressLessonDto(
        lessonName,
        solvedTaskAmount,
        tasks,
      );
    }
    return lessons;
  }

  async findProgressForTeacher(lessonId: string): Promise<ProgressTaskDto[]> {
    const lesson = await this.prisma.lesson.findUniqueOrThrow({
      where: {
        id: lessonId,
      },
      include: {
        tasks: true,
      },
    });

    const tasks: any[] = [];

    for (const task of lesson.tasks) {
      const taskInfo = await this.prisma.task.findUniqueOrThrow({
        where: {
          id: task.task_id,
        },
        include: {
          solving: {
            include: {
              solving_attempts: true,
            },
          },
        },
      });

      const taskName = taskInfo.name;

      const taskAttempts: any[] = [];
      for (const taskSolving of taskInfo.solving) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: {
            id: taskSolving.user_id,
          },
          include: {
            student_classes: true,
          },
        });

        if (
          user.student_classes.some(
            (userClass) => userClass.class_id == lesson.class_id,
          )
        ) {
          let result = '-';
          if (
            taskSolving.solving_attempts.some(
              (attempt) => attempt.task_status == 'SOLVED',
            )
          ) {
            result = '+';
          }
          taskAttempts[taskAttempts.length] = new ProgressTaskAttemptsDto(
            result,
            taskSolving.solving_attempts.length,
            user.name,
            user.surname,
          );
        }
      }
      tasks[tasks.length] = new ProgressTaskDto(taskName, taskAttempts);
    }
    return tasks;
  }
}
