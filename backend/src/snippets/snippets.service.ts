import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SnippetsService {
  constructor(private prismaService: PrismaService) {}

  async getSnippets(page = 1, pageSize = 10) {
    const [items, total] = await Promise.all([
      this.prismaService.snippet.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
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
