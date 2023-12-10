import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from './config.interceptor';
import { JwtAuthGuard } from './middleware/auth/jwt-auth.guard';
import type { Request, Response } from 'express';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('account')
  @UseGuards(JwtAuthGuard)
  @Render('account')
  async account(@Req() req: Request, @Res() res: Response) {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/classes')
  @Render('student/classes')
  getStudentClasses(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/lessons')
  @Render('student/lessons')
  getStudentLessons(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/description')
  @Render('student/description')
  getStudentDescription(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/progress')
  @Render('student/progress')
  getStudentProgress(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/classes')
  @Render('teacher/classes')
  getTeacherClasses(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/lessons')
  @Render('teacher/lessons')
  getTeacherLessons(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/description')
  @Render('teacher/description')
  getTeacherDescription(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/progress')
  @Render('teacher/progress')
  getTeacherProgress(@Req() req: Request) {
    return req.user;
  }

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  home() {
    return {};
  }

  @Get('/lessons/:id')
  @Render('lesson')
  lesson(@Req() req: Request) {
    return req.user;
  }

  @Get('/lessons/:id/tasks/:taskId')
  @Render('task')
  task(@Req() req: Request) {
    return req.user;
  }

  @Get('teacher/tasks/bank')
  @Render('teacher/tasks/bank')
  tasksBank(@Req() req: Request) {
    return req.user;
  }

  @Get('teacher/tasks/:id')
  @Render('teacher/tasks/:id')
  teacherTask(@Req() req: Request) {
    return req.user;
  }

  @Get('teacher/tasks/create')
  @Render('teacher/tasks/create')
  teacherTaskCreate(@Req() req: Request) {
    return req.user;
  }
}
