import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProgressLessonDto } from './progress.lesson.dto';
import { ProgressTaskStatusDto } from './progress.taskStatus.dto';
import { ProgressTeacherDto } from './progress.teacher.dto';
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
        solvingAttemptsArr.forEach((attempt) => {
          if (attempt.task_status == 'SOLVED') {
            finalTaskStatus = attempt.task_status;
          }
        });
        if (finalTaskStatus == 'SOLVED') {
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

  async findProgressForTeacher(
    lessonId: string,
  ): Promise<ProgressTeacherDto[]> {
    const taskArr = await this.prisma.lessonTask.findMany({
      where: {
        lesson_id: lessonId,
      },
    });

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
        let result = '-';
        solvingAttemptsArr.forEach((attempt) => {
          if (attempt.task_status == 'SOLVED') {
            result = '+';
          }
        });
        taskAttempts[taskAttempts.length] = new ProgressTaskAttemptsDto(
          result,
          solvingAttemptsArr.length,
          taskSolving.user_id,
        );
      }
      tasks[tasks.length] = new ProgressTeacherDto(taskName, taskAttempts);
    }
    return tasks;
  }
}
