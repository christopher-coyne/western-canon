import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetFeedDto } from "./DTO/request/get-feed-dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class FeedService {
  constructor(private prismaService: PrismaService) {}

  async getFeed(query: GetFeedDto, userId?: string) {
    // add cursor logic later
    if (userId) {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
    }

    const include: Prisma.SnippetInclude = {
      work: {
        include: { author: true, genres: { include: { genre: true } } },
      },
    };

    if (userId) {
      include.favorites = {
        where: { userId: userId },
      };
    }

    const snippet = await this.prismaService.snippet.findMany({
      where: {
        order: query.cursor,
      },
      take: 1,
      include,
    });

    return snippet.length > 0
      ? { ...snippet[0], favorites: snippet[0].favorites ?? [] }
      : null;
    // return items.map((item) => ({ ...item, favorites: item.favorites ?? [] }));
  }
}
