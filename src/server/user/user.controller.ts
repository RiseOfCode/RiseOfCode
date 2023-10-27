import {
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.userService.deleteUser(userId);
  }

  @Get(':userId')
  async findUserById(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.userService.findUserById(userId);
    if (user == null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }

  @Get(':userNick')
  async findUserByNick(@Param('userNick', ParseUUIDPipe) userNick: string) {
    const user = await this.userService.findUserByNick(userNick);
    if (user == null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }
}
