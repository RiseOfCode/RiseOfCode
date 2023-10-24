import { Lesson, LessonTask } from '@prisma/client';

export class LessonReturnDto {
  constructor(dbLesson: Lesson) {
    this.id = dbLesson.id;
    this.name = dbLesson.name;
    this.theory = dbLesson.theory;
    this.classId = dbLesson.class_id;
  }

  id: string;
  name: string;
  theory: string;
  classId: string;
}
