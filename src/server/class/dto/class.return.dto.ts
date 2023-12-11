import { Class } from '@prisma/client';

export class ClassReturnDto {
  constructor(dbClass: Class) {
    this.id = dbClass.id;
    this.name = dbClass.name;
    this.code = dbClass.code;
    this.description = dbClass.description;
    this.teacherInfo = dbClass.teacher_info;
    this.teacherId = dbClass.teacher_id;
  }

  id: string;
  name: string;
  code: string;
  description: string;
  teacherInfo: string;
  teacherId: string;
}
