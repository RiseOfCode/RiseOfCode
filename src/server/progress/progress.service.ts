import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProgressLessonDto } from './progress.lesson.dto';
import { ProgressTaskDto } from './progress.task.dto';

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
      const lesson_name = lesson.name;
      const taskArr = await this.prisma.lessonTask.findMany({
        where: {
          lesson_id: lesson.id,
        },
      });

      const tasks: any[] = [];
      let solvedTaskAmount = 0;

      for (const task of taskArr) {
        const task_info = await this.prisma.task.findUniqueOrThrow({
          where: {
            id: task.task_id,
          },
        });

        const task_name = task_info.name;
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
        tasks[tasks.length] = new ProgressTaskDto(task_name, finalTaskStatus);
      }

      lessons[lessons.length] = new ProgressLessonDto(
        lesson_name,
        solvedTaskAmount,
        tasks,
      );
    }
    return lessons;
  }
}
