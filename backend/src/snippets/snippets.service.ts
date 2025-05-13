import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SnippetsService {
  constructor(private prismaService: PrismaService) {}

  async getSnippets(
    page = 1,
    pageSize = 10,
    query?: string,
    genreId?: string,
    userId?: string
  ) {
    const where: Prisma.SnippetWhereInput = {};

    if (query) {
      where.OR = [
        {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          work: {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          work: {
            author: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    if (genreId) {
      where.work = {
        genres: {
          some: {
            genreId: genreId,
          },
        },
      };
    }

    const [items, total] = await Promise.all([
      this.prismaService.snippet.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where,
        include: {
          favorites: {
            where: {
              userId,
            },
          },
          work: {
            include: {
              author: true,
              genres: {
                include: {
                  genre: true,
                },
              },
            },
          },
        },
      }),
      this.prismaService.snippet.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }
}
