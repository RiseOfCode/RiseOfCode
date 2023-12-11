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
import { ClassReturnDto } from './dto/class.return.dto';
import { ClassUpdateDto } from './dto/class.update.dto';

@ApiTags('class')
@Controller('api/class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post(':teacherId')
  async addClass(
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Query('name') name: string,
  ): Promise<ClassReturnDto> {
    return this.classService.addClass(teacherId, name);
  }

  @Post('/add/code')
  async addUserByCode(
    @Query('code') code: string,
    @Query('studentId') studentId: string,
  ) {
    return this.classService.addUserByCode(code, studentId);
  }

  @Post('/add/nickname')
  async addUserByNickname(
    @Query('nickname') nickname: string,
    @Query('classId') classId: string,
  ) {
    return this.classService.addUserByNickname(nickname, classId);
  }

  @Get(':classId')
  async findClass(
    @Param('classId', ParseUUIDPipe) classId: string,
  ): Promise<ClassReturnDto> {
    return this.classService.findClass(classId);
  }

  @Get(':classId/students')
  async getStudentsByClass(@Param('classId', ParseUUIDPipe) classId: string) {
    return this.classService.getStudents(classId);
  }

  @Get('/teacher/:teacherId')
  async findByTeacher(
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
  ): Promise<ClassReturnDto[]> {
    return this.classService.findByTeacher(teacherId);
  }

  @Get('/student/:studentId')
  async findByStudent(
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ): Promise<ClassReturnDto[]> {
    return this.classService.findByStudent(studentId);
  }

  @Delete(':classId')
  async deleteClass(@Param('classId', ParseUUIDPipe) classId: string) {
    await this.classService.deleteClass(classId);
  }

  @Put(':classId')
  async changeClass(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Body() Class: ClassUpdateDto,
  ): Promise<ClassReturnDto> {
    return this.classService.changeClass(classId, Class);
  }
}
