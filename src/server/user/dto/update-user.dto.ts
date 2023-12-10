export class UpdateUserDto {
  constructor() {
    this.name = '';
    this.surname = '';
    this.nickname = '';
    this.email = '';
  }
  name: string;
  surname: string;
  nickname: string;
  email: string | null;
}
