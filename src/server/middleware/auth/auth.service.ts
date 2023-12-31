import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any): Promise<string> {
    console.log(user.userId);
    const payload = { nickname: user.nickname, id: user.id };
    const authToken = this.jwtService.sign(payload);
    return `authToken=${authToken}; Path=/; Max-Age=400000000}`;
  }

  async logout(): Promise<string> {
    return `authToken=; Path=/; Max-Age=400000000}`;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByNick(username);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
