import { User, UserRole } from '@prisma/client';

export class CreateUserDto {
  constructor(dbUser: User) {
    // this.id = dbUser.id;
    this.role = dbUser.role;
    this.name = dbUser.name;
    this.surname = dbUser.surname;
    this.nickname = dbUser.nickname;
    this.email = dbUser.email;
    this.password = dbUser.password;
  }
  // id: string;
  role: UserRole;
  name: string;
  surname: string;
  nickname: string;
  email: string | null;
  password: string;
}
