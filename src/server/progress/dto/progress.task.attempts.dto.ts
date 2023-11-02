export class ProgressTaskAttemptsDto {
  constructor(
    result: string,
    attempsAmount: number,
    studentName: string,
    studentSurname: string,
  ) {
    this.result = result;
    this.attempsAmount = attempsAmount;
    this.studentName = studentName;
    this.studentSurname = studentSurname;
  }
  result: string;
  attempsAmount: number;
  studentName: string;
  studentSurname: string;
}
