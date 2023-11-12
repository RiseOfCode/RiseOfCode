import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  @Get('/account/:nickname')
  async findUserByName(@Param('nickname') nickname: string) {
    const users = await this.userService.findUsersByNick(nickname);
    if (users == null) {
      throw new NotFoundException('Not found');
    }
    return users;
  }

  @ApiOperation({
    summary: 'Find user by id',
  })
  @Get('/acc/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    if (user == null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }

  @ApiOperation({
    summary: 'Get all students',
  })
  @Get('users')
  async findAll() {
    const user = await this.userService.findAll();
    if (user == null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }

  @Put(':userId')
  async changeClass(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() User: UpdateUserDto,
  ): Promise<CreateUserDto> {
    return this.userService.changeUser(userId, User);
  }
}
