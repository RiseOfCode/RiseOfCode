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
import { Request, Response } from 'express';
import { User } from '@prisma/client';
interface RequestWithUser extends Request {
  user: User;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('account')
  @UseGuards(JwtAuthGuard)
  @Render('account')
  account(@Req() req: RequestWithUser, @Res() res: Response) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('studentclasses')
  @Render('studentclasses')
  getStudentClasses(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  home() {
    return {};
  }
}
