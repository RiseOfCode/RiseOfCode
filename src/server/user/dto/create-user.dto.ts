import { User as PrismaUser, UserRole as PrismaUserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    enum: ['STUDENT', 'TEACHER'],
  })
  role: PrismaUserRole;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'Doe',
  })
  surname: string;

  @ApiProperty({
    description: 'The nickname of the user',
    example: 'johndoe',
  })
  nickname: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string | null;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;

  constructor(dbUser: PrismaUser) {
    this.role = dbUser.role as PrismaUserRole;
    this.name = dbUser.name;
    this.surname = dbUser.surname;
    this.nickname = dbUser.nickname;
    this.email = dbUser.email;
    this.password = dbUser.password;
  }
}
