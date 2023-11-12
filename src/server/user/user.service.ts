import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createUserWithHashedPassword: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.prisma.user.create({
      data: createUserWithHashedPassword,
    });
  }

  async findUserById(id: string): Promise<CreateUserDto> {
    return new CreateUserDto(
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }

  async findUsersByNick(nickname: string): Promise<CreateUserDto[] | null> {
    const users = await this.prisma.user.findMany({
      where: {
        nickname: {
          startsWith: nickname,
        },
      },
    });

    if (users) {
      return users.map((user) => new CreateUserDto(user));
    } else {
      return null;
    }
  }

  async findUserByNick(nickname: string): Promise<CreateUserDto> {
    return new CreateUserDto(
      await this.prisma.user.findUniqueOrThrow({
        where: {
          nickname,
        },
      }),
    );
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    const users = this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        nickname: true,
        email: true,
        password: true,
      },
    });
    if (!users) {
      return null;
    }
    return users;
  }

  async changeUser(id: string, user: UpdateUserDto): Promise<CreateUserDto> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const updateUserWithHashedPassword: UpdateUserDto = {
      ...user,
      password: hashedPassword,
    };

    return new CreateUserDto(
      await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserWithHashedPassword,
      }),
    );
  }
}
