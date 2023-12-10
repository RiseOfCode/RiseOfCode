export class UpdatePasswordDto {
  constructor() {
    this.passwordOld = '';
    this.password = '';
  }
  passwordOld: string;
  password: string;
}
