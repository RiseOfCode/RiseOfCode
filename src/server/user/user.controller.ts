import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @Post('create')
  async addUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.addUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.userService.deleteUser(userId);
  }

  @ApiOperation({
    summary: 'Find user by nickname',
  })
  @Get('account/:nickname')
  async findUserByName(@Param('nickname') nickname: string) {
    const user = await this.userService.findUserByNick(nickname);
    if (user == null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }

  @ApiOperation({
    summary: 'Get all students',
  })
  @Get(':users')
  async findAll() {
    const user = await this.userService.findAll();
    if (user == null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }
}
