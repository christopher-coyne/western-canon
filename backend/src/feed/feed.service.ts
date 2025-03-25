import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FeedService {
  constructor(private prismaService: PrismaService) {}

  async getFeed(userId?: string, start?: number) {
    // add cursor logic later
    if (userId) {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
    }

    const [items, total] = await Promise.all([
      this.prismaService.snippet.findMany({
        orderBy: {
          order: "asc",
        },
        take: 10,
      }),
      this.prismaService.snippet.count(),
    ]);

    return {
      items,
      total,
      page: Math.floor(start ?? 0 / 10),
      pageSize: 10,
    };
  }
}
