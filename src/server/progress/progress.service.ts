import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProgressLessonDto } from './progress.lesson.dto';
import { ProgressTaskStatusDto } from './progress.taskStatus.dto';
import { ProgressTaskDto } from './progress.task.dto';
import { ProgressTaskAttemptsDto } from './progress.taskAttempts.dto';

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
    });

    const lessons: any[] = [];

    for (const lesson of lessonsArr) {
      const lessonName = lesson.name;
      const taskArr = await this.prisma.lessonTask.findMany({
        where: {
          lesson_id: lesson.id,
        },
      });

      const tasks: any[] = [];
      let solvedTaskAmount = 0;

      for (const task of taskArr) {
        const taskInfo = await this.prisma.task.findUniqueOrThrow({
          where: {
            id: task.task_id,
          },
        });

        const taskName = taskInfo.name;
        const taskSolving = await this.prisma.taskSolving.findFirstOrThrow({
          where: {
            user_id: userId,
            task_id: task.task_id,
          },
        });
        const solvingAttemptsArr = await this.prisma.solvingAttempt.findMany({
          where: {
            task_solving_id: taskSolving.id,
          },
          orderBy: {
            date: 'desc',
          },
        });
        let finalTaskStatus = solvingAttemptsArr[0].task_status;
        if (
          solvingAttemptsArr.some((attempt) => attempt.task_status == 'SOLVED')
        ) {
          finalTaskStatus = 'SOLVED';
          solvedTaskAmount++;
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
    const taskArr = await this.prisma.lessonTask.findMany({
      where: {
        lesson_id: lessonId,
      },
    });

    const lesson = await this.prisma.lesson.findUniqueOrThrow({
      where: {
        id: lessonId,
      },
    });

    const userClassArr = await this.prisma.classStudent.findMany({
      where: {
        class_id: lesson.class_id,
      },
    });

    const usersIdArr: any[] = [];

    for (const userClass of userClassArr) {
      usersIdArr[usersIdArr.length] = userClass.student_id;
    }

    const tasks: any[] = [];

    for (const task of taskArr) {
      const taskInfo = await this.prisma.task.findUniqueOrThrow({
        where: {
          id: task.task_id,
        },
      });

      const taskName = taskInfo.name;
      const taskSolvingArr = await this.prisma.taskSolving.findMany({
        where: {
          task_id: task.task_id,
        },
      });

      const taskAttempts: any[] = [];
      for (const taskSolving of taskSolvingArr) {
        const solvingAttemptsArr = await this.prisma.solvingAttempt.findMany({
          where: {
            task_solving_id: taskSolving.id,
          },
        });

        const user = await this.prisma.user.findUniqueOrThrow({
          where: {
            id: taskSolving.user_id,
          },
        });

        // if (user.id in usersIdArr) {
        if (usersIdArr.some((usersId) => usersId == user.id)) {
          let result = '-';
          if (
            solvingAttemptsArr.some(
              (attempt) => attempt.task_status == 'SOLVED',
            )
          ) {
            result = '+';
          }
          taskAttempts[taskAttempts.length] = new ProgressTaskAttemptsDto(
            result,
            solvingAttemptsArr.length,
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
