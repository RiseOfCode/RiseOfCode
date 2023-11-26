import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render, Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from './config.interceptor';
import { JwtAuthGuard } from './middleware/auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
interface RequestWithUser extends Request {
  user: User;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('account')
  getSomePage(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('studentclasses')
  getStudentClasses(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('studentlessons')
  getStudentLessons(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('studentdescription')
  getStudentDescription(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('studentprogress')
  getStudentProgress(@Req() req: RequestWithUser) {
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
  lesson(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('/lessons/:id/tasks/:taskId')
  @Render('task')
  task(@Req() req: RequestWithUser) {
    return req.user;
  }
}
