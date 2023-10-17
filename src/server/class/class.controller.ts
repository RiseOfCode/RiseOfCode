import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiTags } from '@nestjs/swagger';
import { ClassReturnDto } from './class.returnDto';
import { ClassCreateDto } from './class.createDto';
@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post(':teacher_id')
  async addClass(
    @Param('teacher_id', ParseUUIDPipe) teacher_id: string,
    @Query('name') name: string,
  ): Promise<ClassReturnDto> {
    return this.classService.addClass(teacher_id, name);
  }

  @Post('/adding/code')
  async addUserByCode(
    @Query('code') code: string,
    @Query('student_id') student_id: string,
  ) {
    return this.classService.addUserByCode(code, student_id);
  }

  @Post('/adding/nickname')
  async addUserByNickname(
    @Query('nickname') nickname: string,
    @Query('class_id') class_id: string,
  ) {
    return this.classService.addUserByNickname(nickname, class_id);
  }

  @Get(':class_id')
  async findClass(
    @Param('class_id', ParseUUIDPipe) class_id: string,
  ): Promise<ClassReturnDto> {
    return this.classService.findClass(class_id);
  }

  @Get('/teacher/:teacher_id')
  async findAll(
    @Param('teacher_id', ParseUUIDPipe) teacher_id: string,
  ): Promise<ClassReturnDto[]> {
    return this.classService.findAll(teacher_id);
  }

  @Delete(':class_id')
  async deleteClass(@Param('class_id', ParseUUIDPipe) class_id: string) {
    await this.classService.deleteClass(class_id);
  }

  @Put(':class_id')
  async changeClass(
    @Param('class_id', ParseUUIDPipe) class_id: string,
    @Body() Class: ClassCreateDto,
  ): Promise<ClassReturnDto> {
    return this.classService.changeClass(class_id, Class);
  }
}
