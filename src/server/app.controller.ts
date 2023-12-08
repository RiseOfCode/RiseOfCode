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

  @Get('account')
  @UseGuards(JwtAuthGuard)
  @Render('account')
  async account(@Req() req: Request, @Res() res: Response) {
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('studentclasses')
  @Render('studentclasses')
  getStudentClasses(@Req() req: Request) {
    return {};
  }

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  home() {
    return {};
  }
}
