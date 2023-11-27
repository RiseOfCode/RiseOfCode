import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import jwt from "jsonwebtoken";

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

  async findUserById(id: string) {
    const user = this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
        name: true,
        surname: true,
        nickname: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async findUserByToken(token: string) {
    const decodedToken = jwt.verify(token, '39dkf93kdf032fD!kdfj3j2r3kdf@');
    return decodedToken;
  }

  async findUsersByNick(nickname: string): Promise<CreateUserDto[] | null> {
    const users = await this.prisma.user.findMany({
      where: {
        nickname: {
          startsWith: nickname,
        },
      },
      select: {
        id: true,
        role: true,
        name: true,
        surname: true,
        nickname: true,
        email: true,
        password: true,
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
      select: {
        id: true,
        role: true,
        name: true,
        surname: true,
        nickname: true,
        email: true,
        password: true,
      },
    });
  }

  async findAll() {
    const users = this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
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

  async changeUser(id: string, user: UpdateUserDto) {
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
