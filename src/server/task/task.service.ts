import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskCreateDto } from './dto/task.create.dto';
import { TeacherTaskReturnDto } from './dto/teacher.task.return.dto';
import { TaskBaseReturnDto } from './dto/task.base.return.dto';
import { StudentTaskReturnDto } from './dto/student.task.return.dto';
import { TaskAttemptDto } from './dto/task.attempt.dto';
import { $Enums } from '.prisma/client';
import TaskStatus = $Enums.TaskStatus;
import { TaskTestDto } from './dto/task.test.dto';
import { TaskFilterDto } from './dto/task.filter.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async addTask(teacherId: string, dto: TaskCreateDto): Promise<string> {
    const task = await this.prisma.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        checker: dto.checker,
        teacher_id: teacherId,
      },
    });

    dto.themes.forEach(
      async (theme) =>
        await this.prisma.taskTheme.create({
          data: {
            task_id: task.id,
            theme: theme,
          },
        }),
    );

    dto.tests.forEach(
      async (test) =>
        await this.prisma.test.create({
          data: {
            input: test.input,
            output: test.output,
            task_id: task.id,
          },
        }),
    );

    return task.id;
  }

  async addTaskToLesson(lessonId: string, taskId: string) {
    await this.prisma.lessonTask.create({
      data: {
        lesson_id: lessonId,
        task_id: taskId,
      },
    });
  }

  async deleteTaskFromLesson(taskId: string, lessonId: string) {
    await this.prisma.lessonTask.deleteMany({
      where: {
        lesson_id: lessonId,
        task_id: taskId,
      },
    });
  }

  async getTasksForTeacherLesson(
    lessonId: string,
  ): Promise<TaskBaseReturnDto[]> {
    const tasks = await this.prisma.lessonTask.findMany({
      where: {
        lesson_id: lessonId,
      },
      include: {
        task: true,
      },
    });
    if (tasks == null) throw new NotFoundException();
    const result: any[] = [];
    tasks.forEach((t) => {
      result[result.length] = new TaskBaseReturnDto(t.task, 0);
    });
    return result;
  }

  async getTasksForStudentLesson(
    studentId: string,
    lessonId: string,
  ): Promise<StudentTaskReturnDto[]> {
    const tasks = await this.prisma.lessonTask.findMany({
      where: {
        lesson_id: lessonId,
      },
      include: {
        task: true,
      },
    });
    if (tasks == null) throw new NotFoundException();
    const result: any[] = [];
    for (const task of tasks) {
      const attempts = await this.getStudentTaskAttempts(
        studentId,
        task.task_id,
      );
      result[result.length] = new StudentTaskReturnDto(
        task.task,
        null,
        0,
        null,
        null,
        this.getFinalStudentTaskAttempt(attempts),
      );
    }
    return result;
  }

  async getStudentTaskAttempts(
    studentId: string,
    taskId: string,
  ): Promise<TaskAttemptDto[] | null> {
    const solving = await this.prisma.taskSolving.findFirst({
      where: {
        user_id: studentId,
        task_id: taskId,
      },
      include: {
        solving_attempts: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
    const result: any[] = [];
    solving?.solving_attempts.forEach((attempt) => {
      result[result.length] = new TaskAttemptDto(attempt);
    });
    if (result.length > 0) return result;
    else return null;
  }
  getFinalStudentTaskAttempt(
    attempts: TaskAttemptDto[] | null,
  ): TaskAttemptDto | null {
    if (attempts != null) {
      const solved = attempts.find((x) => x.status == TaskStatus.SOLVED);
      if (solved == null) return attempts[0];
      else return solved;
    } else return null;
  }
  async getTaskForTeacherById(taskId: string): Promise<TeacherTaskReturnDto> {
    const task = await this.prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
      include: {
        themes: {
          select: {
            theme: true,
          },
        },
        tests: true,
      },
    });

    const tests: any[] = [];
    task.tests.forEach((t) => {
      tests[tests.length] = new TaskTestDto(t);
    });
    const themes: any[] = [];
    task.themes.forEach((t) => {
      themes[themes.length] = t.theme;
    });
    return new TeacherTaskReturnDto(
      task,
      themes,
      await this.countTaskRating(taskId),
      tests,
    );
  }
  async countTaskRating(taskId: string): Promise<number> {
    const result = await this.prisma.taskRating.aggregate({
      where: {
        task_id: taskId,
      },
      _avg: {
        rating: true,
      },
    });
    if (result._avg.rating == null) return 0;
    else return result._avg.rating;
  }
  async getTaskForStudentById(
    studentId: string,
    taskId: string,
  ): Promise<StudentTaskReturnDto> {
    const task = await this.prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
      include: {
        themes: {
          select: {
            theme: true,
          },
        },
        tests: true,
      },
    });

    const tests: any[] = [];
    task.tests.forEach((t) => {
      tests[tests.length] = new TaskTestDto(t);
    });
    const themes: any[] = [];
    task.themes.forEach((t) => {
      themes[themes.length] = t.theme;
    });
    const attempts = await this.getStudentTaskAttempts(studentId, taskId);
    return new StudentTaskReturnDto(
      task,
      themes,
      0,
      tests,
      attempts,
      this.getFinalStudentTaskAttempt(attempts),
    );
  }
  async getTasksForTeacher(
    filter: TaskFilterDto,
  ): Promise<TaskBaseReturnDto[]> {
    let tasks = null;
    if (filter.themes != null)
      tasks = await this.prisma.taskTheme.findMany({
        where: {
          theme: {
            in: filter.themes,
          },
        },
        include: {
          task: true,
        },
        distinct: ['task_id'],
      });
    else
      tasks = await this.prisma.taskTheme.findMany({
        include: {
          task: true,
        },
        distinct: ['task_id'],
      });
    if (tasks == null) throw new NotFoundException();
    const result: any[] = [];
    for (const t of tasks) {
      const rating = await this.countTaskRating(t.task_id);
      if (rating >= filter.minRating)
        result[result.length] = new TaskBaseReturnDto(t.task, rating);
    }
    if (filter.isDesc) return result.sort((a, b) => b.rating - a.rating);
    else return result.sort((a, b) => a.rating - b.rating);
  }
  async estimateTask(teacherId: string, taskId: string, rating: number) {
    const estimation = await this.prisma.taskRating.findFirst({
      where: {
        teacher_id: teacherId,
        task_id: taskId,
      },
    });
    if (estimation == null)
      await this.prisma.taskRating.create({
        data: {
          task_id: taskId,
          teacher_id: teacherId,
          rating: Number(rating),
        },
      });
    else
      await this.prisma.taskRating.updateMany({
        where: {
          teacher_id: teacherId,
          task_id: taskId,
        },
        data: {
          rating: Number(rating),
        },
      });
  }
}