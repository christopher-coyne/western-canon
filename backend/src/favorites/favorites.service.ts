import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async getFavoriteSnippets(userId: string, page = 1, pageSize = 10) {
    const [items, total] = await Promise.all([
      this.prismaService.favorite.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: { userId },
        include: {
          snippet: {
            include: {
              work: {
                include: {
                  author: true,
                },
              },
            },
          },
        },
      }),
      this.prismaService.favorite.count({ where: { userId } }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  async toggleFavoriteSnippet(userId: string, snippetId: string) {
    // First check if snippet exists
    const favoriteSnippet = await this.prismaService.favorite.findFirst({
      where: { snippetId, userId },
    });

    if (!favoriteSnippet) {
      await this.prismaService.favorite.create({
        data: { snippetId, userId },
      });
    } else {
      // Create favorite
      return await this.prismaService.favorite.delete({
        where: {
          userId_snippetId: {
            userId,
            snippetId,
          },
        },
      });
    }
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
