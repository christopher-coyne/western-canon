import { Injectable, NotFoundException } from "@nestjs/common";
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

  async favoriteSnippet(userId: string, snippetId: string) {
    // First check if snippet exists
    const snippet = await this.prismaService.snippet.findUnique({
      where: { id: snippetId },
    });

    if (!snippet) {
      throw new NotFoundException("Snippet not found");
    }

    // Create favorite
    return this.prismaService.favorite.create({
      data: {
        userId,
        snippetId,
      },
    });
  }

  async unfavoriteSnippet(userId: string, snippetId: string) {
    // Delete favorite
    return this.prismaService.favorite.delete({
      where: {
        userId_snippetId: {
          userId,
          snippetId,
        },
      },
    });
  }
}
