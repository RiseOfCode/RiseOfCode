import {Controller, Post, UseGuards, Req, Res, Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import {JwtAuthGuard} from "./jwt-auth.guard";
interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user } = req;
    const cookie = this.authService.login(user);
    res.setHeader('Set-Cookie', await cookie);
    return res.send(user);
  }

  @Post('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const cookie = this.authService.logout();
    res.setHeader('Set-Cookie', await cookie);
    return res.send();
  }
}
