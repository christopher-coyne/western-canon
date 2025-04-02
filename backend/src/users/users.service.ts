import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from "@prisma/client";
import { UpdateCursorDto } from "./DTO/requests/update-cursor.dto";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string, password: string): Promise<any | undefined> {
    return this.prismaService.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      ...user,
      favoriteCount: user._count.favorites,
    };
  }

  async updateCursor(userId: string, updateCursorDto: UpdateCursorDto) {
    console.log("updateCursorDto ", updateCursorDto);
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { cursor: updateCursorDto.cursor },
    });

    console.log("UPDATED user ", user);
    return user;
  }
}
