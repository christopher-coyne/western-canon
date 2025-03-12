import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async getFavoriteSnippets(userId: string, page = 1, pageSize = 10) {
    const [items, total] = await Promise.all([
      this.prismaService.snippet.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          favorites: {
            where: { userId: userId },
          },
        },
      }),
      this.prismaService.snippet.count(),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }
}
