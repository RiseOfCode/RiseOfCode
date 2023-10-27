import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.prisma.user.create({ data: createUserDto });
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

  // async changePassword(id: string, dto: UserUpdateDto): Promise<CreateUserDto> {
  // }
}
