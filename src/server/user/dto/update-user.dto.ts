export class UpdateUserDto {
  constructor() {
    this.name = '';
    this.surname = '';
    this.nickname = '';
    this.email = '';
    this.password = '';
  }
  name: string;
  surname: string;
  nickname: string;
  email: string | null;
  password: string;
}
