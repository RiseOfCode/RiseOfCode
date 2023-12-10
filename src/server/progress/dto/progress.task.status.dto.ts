export class ProgressTaskStatusDto {
  constructor(name: string, status: string) {
    this.name = name;
    this.status = status;
  }
  name: string;
  status: string;
}
