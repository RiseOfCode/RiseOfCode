import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentTaskReturnDto } from './dto/student.task.return.dto';
import { TaskBaseReturnDto } from './dto/task.base.return.dto';
import { TaskCreateDto } from './dto/task.create.dto';
import { TeacherTaskReturnDto } from './dto/teacher.task.return.dto';
import { TaskService } from './task.service';
import { TaskFilterDto } from './dto/task.filter.dto';
@ApiTags('task')
@Controller('api/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('student/:studentId/lesson/:lessonId')
  async getTasksForStudentLesson(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<StudentTaskReturnDto[]> {
    return this.taskService.getTasksForStudentLesson(studentId, lessonId);
  }

  @Get('student/:studentId/:taskId')
  async getTaskForStudentById(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ): Promise<StudentTaskReturnDto> {
    return this.taskService.getTaskForStudentById(studentId, taskId);
  }

  @Post('bank')
  async getTasksForTeacher(
    @Body() filter: TaskFilterDto,
  ): Promise<TaskBaseReturnDto[]> {
    return this.taskService.getTasksForTeacher(filter);
  }

  @Post('teacher/:teacherId')
  async addTask(
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Body() task: TaskCreateDto,
  ): Promise<string> {
    return this.taskService.addTask(teacherId, task);
  }

  @Post('teacher/:taskId/lesson/:lessonId')
  async addTaskToLesson(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ) {
    return this.taskService.addTaskToLesson(lessonId, taskId);
  }

  @Delete('teacher/:taskId/lesson/:lessonId')
  async deleteTaskFromLesson(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ) {
    return this.taskService.deleteTaskFromLesson(lessonId, taskId);
  }

  @Get('teacher/lesson/:lessonId')
  async getTasksForTeacherLesson(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<TaskBaseReturnDto[]> {
    return this.taskService.getTasksForTeacherLesson(lessonId);
  }

  @Get('teacher/:taskId')
  async getTaskForTeacherById(
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ): Promise<TeacherTaskReturnDto> {
    return this.taskService.getTaskForTeacherById(taskId);
  }

  @Post('teacher/:teacherId/estimate/:taskId')
  async estimateTask(
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Query('rating') rating: number,
  ) {
    return this.taskService.estimateTask(teacherId, taskId, rating);
  }
}
