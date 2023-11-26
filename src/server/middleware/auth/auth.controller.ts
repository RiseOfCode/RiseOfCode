import { Controller, Post, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { user } = req;
    const cookie = this.authService.login(user);
    res.setHeader('Set-Cookie', await cookie);
    return res.send(user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    const cookie = this.authService.logout();
    res.setHeader('Set-Cookie', await cookie);
    return res.send();
  }
}
