export class ProgressTaskAttemptsDto {
  constructor(result: string, attempsAmount: number, studentId: string) {
    this.result = result;
    this.attempsAmount = attempsAmount;
    this.studentId = studentId;
  }
  result: string;
  attempsAmount: number;
  studentId: string;
}
