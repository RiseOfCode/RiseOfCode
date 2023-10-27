import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(userDto: CreateUserDto) {
    // Ваша логика создания пользователя
  }

  async login(loginDto: LoginDto) {
    // Ваша логика аутентификации пользователя
  }
}
