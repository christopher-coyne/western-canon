import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetFeedDto } from "./DTO/request/get-feed-dto";

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

    const [items, total] = await Promise.all([
      this.prismaService.snippet.findMany({
        where: {
          OR: [
            // 3 items less than cursor
            {
              order: {
                lt: query.cursor,
              },
            },
            // The cursor item itself
            {
              order: query.cursor,
            },
            // 3 items greater than cursor
            {
              order: {
                gt: query.cursor,
              },
            },
          ],
        },
        orderBy: {
          order: "asc",
        },
        take: 7, // 3 below + 1 at cursor + 3 above
        include: {
          work: {
            include: { author: true, genres: { include: { genre: true } } },
          },
          favorites: {
            where: {
              userId: userId,
            },
          },
        },
      }),
      this.prismaService.snippet.count(),
    ]);

    return items;
  }
}
