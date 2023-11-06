import { Lesson, Class } from '@prisma/client';

export class LessonReturnDto {
  constructor(dbLesson: Lesson, dbClass: Class) {
    this.id = dbLesson.id;
    this.name = dbLesson.name;
    this.theory = dbLesson.theory;
    this.classId = dbLesson.class_id;
    this.className = dbClass.name;
  }

  id: string;
  name: string;
  theory: string;
  classId: string;
  className: string;
}
