import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string, password: string): Promise<any | undefined> {
    return this.prismaService.user.findFirst({
      where: {
        name: username,
        password: password,
      },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        dayStreak: true,
        lastActive: true,
        createdAt: true,
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
}
