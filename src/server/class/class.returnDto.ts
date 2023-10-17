import { Class } from '@prisma/client';
export class ClassReturnDto {
  constructor(the_class: Class) {
    this.id = the_class.id;
    this.name = the_class.name;
    this.code = the_class.code;
    this.description = the_class.description;
    this.teacher_info = the_class.teacher_info;
    this.teacher_id = the_class.teacher_id;
  }
  id: string;
  name: string;
  code: string;
  description: string;
  teacher_info: string;
  teacher_id: string;
}
